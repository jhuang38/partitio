from flask import Blueprint
from api.auth import auth_service
from api import db
from flask_bcrypt import Bcrypt

auth = Blueprint(name='auth', import_name='auth', url_prefix='/auth')

auth_service = auth_service.Auth(db, Bcrypt())

from api.auth import routes