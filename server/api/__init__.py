from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask_socketio import SocketIO
from models import User
from flask_bcrypt import check_password_hash
import jwt

import logging
import os

db = SQLAlchemy()
socketio = SocketIO()
login_manager = LoginManager()
login_manager.session_protection = "strong"

from api.auth import auth
from api.collections import collections
from api.project import projects

services = Blueprint(name='api', import_name='api', url_prefix='/api')

def create_app():
    app = Flask(__name__)
    # set configs
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI')
    app.config['SECRET_KEY']  = os.environ.get('FLASK_SECRET_KEY')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)

    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
    

    # register blueprints
    services.register_blueprint(auth)
    services.register_blueprint(collections)
    services.register_blueprint(projects)
    app.register_blueprint(services)
    

    db.init_app(app)
    login_manager.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    return app

# @login_manager.user_loader
# def load_user(uid):
#     return db.session.query(User).filter(User.uid == uid).first()


@login_manager.request_loader
def load_user_req(request):
    auth_headers = request.headers.get('Authorization', '').split()
    if len(auth_headers) != 2:
        pass
    else:
        try:
            token = auth_headers[1]
            data = jwt.decode(token, os.environ.get('FLASK_SECRET_KEY'), algorithms='HS256')
            username = data['username']
            uid = data['uid']
            user = db.session.query(User).filter((User.username == username) & (User.uid == uid)).first()
            if user:
                user.set_auth_status(True)
                return user
        except (Exception) as e:
            print(e)
    # try regular login
    username_arg = request.args.get('username')
    pwd_arg = request.args.get('password')
    if not username_arg:
        username_arg = ''
    if not pwd_arg:
        pwd_arg = ''
    user = db.session.query(User).filter(User.username == username_arg).first()
    if user is not None:
        if check_password_hash(pw_hash=user.password, password=pwd_arg):
            user.set_auth_status(True)
            return user
        
        user.set_auth_status(False)
    return None

@login_manager.user_loader
def load_user(uid):
    return db.session.query(User).filter(User.uid == uid).first()