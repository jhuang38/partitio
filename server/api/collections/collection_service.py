from uuid import uuid5, uuid1, uuid4, NAMESPACE_DNS
from models import Collection, UserCollectionMap, Link
from api.auth import auth_service

class CollectionManager():
    def __init__(self, db):
        self.db = db
    
    def add_collection(self, collection_name, collection_creator, collection_description='', collection_visibility=False, collection_maintainers=[], collection_viewers = []):
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
            new_map_id = str(uuid1())
            if auth_service.user_exists(maintainer_username['value']):
                maintainer_map.append(UserCollectionMap(
                    map_id = new_map_id,
                    collection_id = collection_id,
                    username = maintainer_username['value'],
                    permission = 'maintainer'
                ))
                maintainer_list.append(maintainer_username['value'])
                
        viewers_to_add = [viewer for viewer in collection_viewers if viewer not in collection_maintainers]
        viewer_list = []
        viewer_map = []
        for viewer_username in viewers_to_add:
            new_map_id = str(uuid1())
            if auth_service.user_exists(viewer_username['value']):
                viewer_map.append(UserCollectionMap(
                    map_id = new_map_id,
                    collection_id = collection_id,
                    username = viewer_username['value'],
                    permission = 'viewer'
                ))
                viewer_list.append(viewer_username['value'])

            
        self.db.session.add(collection)
        self.db.session.add_all(maintainer_map + viewer_map)
        self.db.session.commit()

        return dict(status = 'success', error = None, maintainers = maintainer_list, viewers = viewer_list, added = {
            'collection_id': collection_id,
            'collection_name': collection_name,
            'collection_description': collection_description,
            'is_public': collection_visibility,
            'permission': 'owner'
        })
    
    def get_public_collections(self):
        return []
    
    def get_user_collections(self, username, query_type='user'):
        collection_id_mappings = []
        if query_type == 'shared':
            collection_id_mappings = self.db.session.query(UserCollectionMap).filter((username == UserCollectionMap.username) & (UserCollectionMap.permission != 'owner'))
        else:
            collection_id_mappings = self.db.session.query(UserCollectionMap).filter((username == UserCollectionMap.username) & (UserCollectionMap.permission == 'owner'))
        collections = []
        for mapping in collection_id_mappings:
            collection = mapping.collection
            maintainers = self.db.session.query(UserCollectionMap).filter((UserCollectionMap.collection_id == collection.collection_id) & (UserCollectionMap.permission == 'maintainer')).all()
            maintainer_usernames = list(map(lambda entry: entry.username, maintainers))
            viewers = self.db.session.query(UserCollectionMap).filter((UserCollectionMap.collection_id == collection.collection_id) & (UserCollectionMap.permission == 'viewer')).all()
            viewer_usernames = list(map(lambda entry: entry.username, viewers))
            collections.append({
                'collection_id': collection.collection_id,
                'collection_name': collection.collection_name,
                'collection_description': collection.description,
                'is_public': collection.is_public,
                'permission': mapping.permission,
                'maintainers': maintainer_usernames,
                'viewers': viewer_usernames
            })
        return collections

    
    def get_collection_by_name(self, collection_name, username):
        """
        gets collection info + permissions of requesting user
        """
        collection = self.db.session.query(Collection).filter(Collection.collection_name == collection_name).first()
        mapping = self.db.session.query(UserCollectionMap).filter((UserCollectionMap.collection_id == collection.collection_id) & (UserCollectionMap.username == username )).first()
        maintainers = self.db.session.query(UserCollectionMap).filter((UserCollectionMap.collection_id == collection.collection_id) & (UserCollectionMap.permission == 'maintainer')).all()
        viewers = self.db.session.query(UserCollectionMap).filter((UserCollectionMap.collection_id == collection.collection_id) & (UserCollectionMap.permission == 'viewer')).all()
        return {
           'collection_id': collection.collection_id,
            'collection_name': collection.collection_name,
            'collection_description': collection.description,
            'is_public': collection.is_public,
            'permission': mapping.permission,
            'maintainers': maintainers,
            'viewers': viewers
        }
    
    def clear_collection_mapping(self, collection: Collection):
        """
        clears user collection mapping
        """
        self.db.session.query(UserCollectionMap).filter(UserCollectionMap.collection == collection).delete()
        self.db.session.commit()
    
    def clear_collection_links(self, collection: Collection):
        """
        clears associated links with a collection
        note: this is used because attempting use a cascade with sqlalchemy did not work for whatever reason.
        """
        self.db.session.query(Link).filter(Link.collection == collection).delete()
        self.db.session.commit()
    
    def is_collection_owner(self, collection: Collection, username: str):
        """
        Check if the given user is the owner of the given the collection.
        Returns the user if they are, None otherwise.
        """
        return self.db.session.query(UserCollectionMap).filter((UserCollectionMap.username == username) & (UserCollectionMap.permission == 'owner') & (UserCollectionMap.collection == collection)).first()
    
    def edit_collection(self, username, collection_id, collection_name, collection_description, collection_visibility, maintainers=[], viewers = []):
        res = {
            'error': True,
            'msg': 'Unauthorized action by user.',
            'data': {}
        }
        collection = self.db.session.query(Collection).filter(Collection.collection_id == collection_id).first()
        if self.is_collection_owner(collection=collection, username=username):
            self.clear_collection_mapping(collection=collection)
            self.db.session.query(Collection).filter(Collection.collection_id == collection_id).update({
                'collection_name': collection_name,
                'description': collection_description,
                'is_public': collection_visibility,
            })
            self.db.session.add(UserCollectionMap(
                map_id=str(uuid1()),
                collection_id=collection_id,
                username=username,
                permission='owner'
            ))
            maintainer_map = []
            maintainer_list = []
            for maintainer in maintainers:
                new_map_id = str(uuid1())
                if auth_service.user_exists(maintainer['value']):
                    maintainer_map.append(UserCollectionMap(
                        map_id = new_map_id,
                        collection_id = collection_id,
                        username = maintainer['value'],
                        permission = 'maintainer'
                    ))
                    maintainer_list.append(maintainer['value'])
            
            ### TODO IN FUTURE - extract logic for adding user map into separate function, as it is basically the same between maintainers/viewers
            added_viewers = [viewer for viewer in viewers if viewer not in maintainers]
            viewer_map = []
            viewer_list = []
            for viewer in added_viewers:
                new_map_id = str(uuid1())
                if auth_service.user_exists(viewer['value']):
                    viewer_map.append(UserCollectionMap(
                        map_id=new_map_id,
                        collection_id=collection_id,
                        username=viewer['value'],
                        permission='viewer'
                    ))
                    viewer_list.append(viewer['value'])
            self.db.session.add_all(maintainer_map)
            self.db.session.add_all(viewer_map)
            self.db.session.commit()

            res['error'] = False
            res['msg'] = 'Collection succesfully updated.'
            res['data'] = {
                'collection_id': collection_id,
                'collection_name': collection_name,
                'collection_description': collection_description,
                'is_public': collection_visibility,
                'permission': 'owner',
                'maintainers': maintainer_list,
                'viewers': viewer_list
            }
        return res

    def delete_collection(self, collection_id, username):
        res = {
            'error': True,
            'msg': 'Unauthorized action by user.',
            'data': {}
        }
        collection = self.db.session.query(Collection).filter(Collection.collection_id == collection_id).first()
        if self.is_collection_owner(collection, username):
            self.clear_collection_mapping(collection=collection)
            self.clear_collection_links(collection=collection)
            self.db.session.query(Collection).filter(Collection.collection_id == collection_id).delete()
            self.db.session.commit()
            res['error'] = False
            res['msg'] = f'Collection id {collection_id} succesfully deleted.'
            res['data'] = {
                'collection_id': collection_id
            }
        return res