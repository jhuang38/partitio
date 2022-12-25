from flask import Blueprint
from api.project import project_service
from api import db

projects = Blueprint(name='project', import_name='project', url_prefix='/project')

project_manager = project_service.ProjectManager(db)

from api.project import routes