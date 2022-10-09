from flask import Blueprint

auth = Blueprint(name='auth', import_name='auth', url_prefix='/auth')

from api.auth import routes