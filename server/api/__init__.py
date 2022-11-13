from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy import create_engine
from flask_cors import CORS
from models import User

import logging
import os

db = SQLAlchemy()
login_manager = LoginManager()
# engine = create_engine(os.environ.get('DB_URI'))

from api.auth import auth

services = Blueprint(name='api', import_name='api', url_prefix='/api')



def create_app():
    app = Flask(__name__)
    # set configs
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URI')

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

@login_manager.user_loader
def load_user(uid):
    return User.query.get(uid)
