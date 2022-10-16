from flask import Flask, Blueprint
from flask_cors import CORS
import logging
import os
from api.auth import auth

services = Blueprint(name='api', import_name='api', url_prefix='/api')

def create_app():
    app = Flask(__name__)

    CORS(app)

    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

    print('env port', os.environ.get('SERVER_PORT'))

    # register blueprints
    services.register_blueprint(auth)
    app.register_blueprint(services)
    return app