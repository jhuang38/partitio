from models import Link, Collection, UserCollectionMap, User
from uuid import uuid1
import datetime

class ProjectManager:
    def __init__(self, db):
        self.db = db
    
    def get_project_view(self, collection_id='', user_id='') -> dict:
        collection = self.db.session.query(Collection).filter(Collection.collection_id == collection_id).first()
        username = self.db.session.query(User).filter(User.uid == user_id).first().username
        requesting_user = self.db.session.query(UserCollectionMap).filter((UserCollectionMap.username == username) & (UserCollectionMap.collection_id == collection_id)).first()
        links = self.get_links(collection_id=collection_id)['links']
        res = {
            'editable': False,
            'viewable': False,
            'cid': collection_id,
            'name': collection.collection_name,
            'description': collection.description,
            'links': links
        }
        user_permission = None
        if requesting_user or collection.is_public:
            if (requesting_user):
                user_permission = requesting_user.permission
            res['viewable'] = True
        if (user_permission == 'maintainer' or user_permission == 'owner'):
           res['editable'] = True
        
        return res
    
    def add_link(self, collection_id='', username='', link_name='', link_description='', link_url='') -> dict:
        """
        Adds a link to corresponding collection.
        Returns info about added link.
        """
        last_updated = datetime.datetime.now()
        res = {
            'data': {
                'cid': collection_id,
                'last_updated_by': username,
                'last_updated_time': last_updated.isoformat(),
                'link_name': link_name,
                'link_desc': link_description,
                'link_url': link_url
            },
            'error': True,
            'msg': 'Link not added.'  
        }
        try:
            link_id = str(uuid1())
            new_link = Link(
                link_id=link_id,
                link_name=link_name,
                link_description=link_description,
                link_url=link_url,
                collection_id=collection_id,
                last_updated=last_updated,
                last_updated_by=username
            )
            self.db.session.add(new_link)
            self.db.session.commit()
            res['error'] = False
            res['msg'] = ''
        except Exception as e:
            res['msg'] = str(e)
        return res


    def edit_link(self, collection_id='', username='', link_id='', new_link_name='', new_link_desc='', new_link_url='') -> dict:
        """
        Updates an existing link, querying using the given link_id.
        Returns the updated result.
        """
        last_updated = datetime.datetime.now()
        res = {
            'data': {
                'cid': collection_id,
                'link_name': new_link_name,
                'link_description': new_link_desc,
                'link_url': new_link_url,
                'last_updated': last_updated,
                'last_updated_by': username
            },
            'error': True,
            'msg': ''
        }
        
        try:
            self.db.session.query(Link).filter(Link.link_id == link_id).update({
                'link_name': new_link_name,
                'link_description': new_link_desc,
                'link_url': new_link_url,
                'last_updated': last_updated,
                'last_updated_by': username
            })
            res['error'] = False
            self.db.session.commit()
        except Exception as e:
            res['msg'] = str(e)
        
        return res
        

    def delete_link(self, collection_id='', link_id=''):
        res = {
            'data': {},
            'error': True,
            'msg': ''
        }
        try:
            self.db.session.query(Link).filter(Link.link_id == link_id).delete()
            self.db.session.commit()
            res['error'] = False
            res['msg'] = 'Link succesfully deleted.'
        except Exception as e:
            res['msg'] = str(e)
        return res

    def get_links(self, collection_id=''):
        links = self.db.session.query(Link).filter(Link.collection_id==collection_id).all()
        link_list = [{
            'link_id': link.link_id,
            'link_name': link.link_name,
            'link_desc': link.link_description,
            'link_url': link.link_url,
            'last_updated': link.last_updated.isoformat(),
            'last_updated_by': link.last_updated_by
        } for link in links]
        return {
            'links': link_list,
            'cid': collection_id
        }
