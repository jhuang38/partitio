from uuid import uuid5, uuid1, uuid4, NAMESPACE_DNS
from models import Collection, UserCollectionMap
from api.auth import auth_service

class CollectionManager():
    def __init__(self, db):
        self.db = db
    
    def add_collection(self, collection_name, collection_creator, collection_description='', collection_visibility=False, collection_maintainers=[]):
        collection_id = str(uuid4())
        collection = Collection(
            collection_id=collection_id, 
            collection_name = collection_name,
            description = collection_description,
            is_public = collection_visibility
        )
        maintainer_map = []
        maintainer_list = []
        maintainer_map.append(UserCollectionMap(
            map_id = str(uuid1()),
            collection_id = collection_id,
            username = collection_creator['username'],
            permission = 'owner'
        ))
        for maintainer_username in collection_maintainers:
            print(maintainer_username['value'])
            new_map_id = str(uuid1())
            if auth_service.user_exists(maintainer_username['value']):
                maintainer_map.append(UserCollectionMap(
                    map_id = new_map_id,
                    collection_id = collection_id,
                    username = maintainer_username['value'],
                    permission = 'maintainer'
                ))
                maintainer_list.append({
                    'collection': collection_name,
                    'maintainer_name': maintainer_username['value']
                })
                
            
        self.db.session.add(collection)
        self.db.session.add_all(maintainer_map)
        self.db.session.commit()

        return dict(status = 'success', error = None, maintainers = maintainer_list, added = {
            'collection_id': collection_id,
            'collection_name': collection_name,
            'collection_description': collection_description,
            'is_public': collection_visibility,
            'permission': 'owner'
        })
    
    def get_public_collections(self):
        return []
    
    def get_user_collections(self, username):
        collection_id_mappings = self.db.session.query(UserCollectionMap).filter(username == UserCollectionMap.username)
        collections = []
        for mapping in collection_id_mappings:
            collection = mapping.collection
            collections.append({
                'collection_id': collection.collection_id,
                'collection_name': collection.collection_name,
                'collection_description': collection.description,
                'is_public': collection.is_public,
                'permission': mapping.permission
            })
        return collections
    
    def get_collection_by_name(self, collection_name, username):
        """
        gets collection info + permissions of requesting user
        """
        collection = self.db.session.query(Collection).filter(Collection.collection_name == collection_name).first()
        mapping = self.db.session.query(UserCollectionMap).filter((UserCollectionMap.collection_id == collection.collection_id) & (UserCollectionMap.username == username )).first()
        return {
           'collection_id': collection.collection_id,
            'collection_name': collection.collection_name,
            'collection_description': collection.description,
            'is_public': collection.is_public,
            'permission': mapping.permission 
        }