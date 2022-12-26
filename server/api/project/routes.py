from api.project import projects, project_manager
from api import socketio
from flask_socketio import emit, join_room, leave_room, disconnect
from flask import jsonify, request
from flask_login import login_required, current_user
from api.auth import auth_service
import jwt
import os
import functools

# decorator to authenticate socketio routes
def authenticated_only(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        # auth_headers = request.headers.get('Authorization', '').split()
        # if len(auth_headers) != 2:
        #     return False
        # try:
        #     token = jwt.decode(auth_headers[1], os.environ.get('FLASK_SECRET_KEY'), algorithms='HS256')
        #     jwt_username = token['username']
        #     user = auth_service.get_user_by_name(jwt_username)
        #     if not user:
        #         return False

        # except Exception as e:
        #     print('socketio exception', e)
        #     return False
        # if not current_user.is_authenticated:
        #     disconnect()
        #     return False
        return f(*args, **kwargs)
    return wrapped

@projects.route('/get_project_view', methods=['GET'])
@login_required
def get_project_view():
    collection_id = request.args.get('cid')
    auth_headers = request.headers.get('Authorization', '').split()
    user_id = ''
    if len(auth_headers) == 2:
        try:
            token = jwt.decode(auth_headers[1], os.environ.get('FLASK_SECRET_KEY'), algorithms='HS256')
            user_id = token.get('uid')
        except Exception as e:
            print(e)

    view_response = project_manager.get_project_view(
        collection_id=collection_id,
        user_id=user_id
    )
    return jsonify(view_response)

def emit_update(cid='', prev_links=[]):
    if (not cid):
        return
    link_data = project_manager.get_links(collection_id=cid)
    if (prev_links == link_data):
        return
    emit('links updated', link_data, to=cid)

@socketio.on('join project room')
@authenticated_only
def join_project_room(payload):
    cid = payload['cid']
    join_room(room=cid)

@socketio.on('link added')
@authenticated_only
def add_new_link(payload):
    cid = payload['cid']
    username = payload['username']
    link_name = payload['name']
    link_desc = payload['desc']
    link_url = payload['url']

    prev_links = project_manager.get_links(collection_id=cid)

    project_manager.add_link(
        collection_id=cid,
        username=username,
        link_name=link_name,
        link_description=link_desc,
        link_url=link_url
    )
    emit_update(cid=cid, prev_links=prev_links)

@socketio.on('link edited')
@authenticated_only
def edit_link(payload):
    cid = payload['cid']
    edited_by = payload['username']
    link_id = payload['link_id']
    link_name = payload['link_name']
    link_desc = payload['link_desc']
    link_url = payload['link_url']

    prev_links = project_manager.get_links(collection_id=cid)

    project_manager.edit_link(
        collection_id=cid,
        username=edited_by,
        link_id=link_id,
        new_link_name=link_name,
        new_link_desc=link_desc,
        new_link_url=link_url
    )
    emit_update(cid=cid, prev_links=prev_links)

@socketio.on('link deleted')
@authenticated_only
def delete_link(payload):
    cid = payload['cid']
    link_id = payload['link_id']

    prev_links = project_manager.get_links(collection_id=cid)

    project_manager.delete_link(
        collection_id=cid,
        link_id=link_id
    )
    emit_update(cid=cid, prev_links=prev_links)


@socketio.on('exit')
def exit(payload):
    room = payload['cid']
    leave_room(room=room)