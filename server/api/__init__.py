from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from models import User
from flask_bcrypt import check_password_hash
import jwt

import logging
import os

db = SQLAlchemy()
login_manager = LoginManager()

from api.auth import auth

services = Blueprint(name='api', import_name='api', url_prefix='/api')

def create_app():
    app = Flask(__name__)
    # set configs
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI')
    app.config['SECRET_KEY']  = os.environ.get('FLASK_SECRET_KEY')

    CORS(app)

    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
    

    # register blueprints
    services.register_blueprint(auth)
    app.register_blueprint(services)

    db.init_app(app)
    login_manager.init_app(app)

    return app


@login_manager.request_loader
def load_user(request):
    # try login with token first
    auth_headers = request.headers.get('Authorization', '').split()
    if len(auth_headers) != 2:
        return None
    try:
        token = auth_headers[1]
        data = jwt.decode(token, os.environ.get('FLASK_SECRET_KEY'), algorithms='HS256')
        username = data['username']
        uid = data['uid']
        user = db.session.query(User).filter((User.username == username) & (User.uid == uid)).first()
        if user:
            user.set_auth_status(True)
            return user

    except jwt.ExpiredSignatureError:
        return None
    except (jwt.InvalidTokenError, Exception) as e:
        print(e)
        return None
    # try regular login
    username_arg = request.args.get('username')
    pwd_arg = request.args.get('password')
    user = db.session.query(User).filter_by(User.username == username_arg).first()
    if check_password_hash(pw_hash=user.password, password=pwd_arg):
        user.set_auth_status(True)
        return user
    
    user.set_auth_status(False)
    return None