from api.collections import collection_service
from flask import Blueprint
from api import db

collections = Blueprint(name='collections', import_name='collections',url_prefix='collections')

collection_manager = collection_service.CollectionManager(db=db)

from api.collections import routes