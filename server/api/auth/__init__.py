from flask import Blueprint
from api.auth import auth_service

auth = Blueprint(name='auth', import_name='auth', url_prefix='/auth')

auth_service = auth_service.Auth()

from api.auth import routes