from api.collections import collections, collection_manager
from flask import jsonify, request
from flask_login import login_required

@collections.route('/add_collection', methods=['POST'])
@login_required
def add_collection():
    json_body = request.get_json()
    collection_name = json_body['collectionName']
    collection_description = json_body['collectionDescription']
    collection_visibility = json_body['collectionVisibility']
    collection_maintainers = json_body['collectionMaintainers']
    collection_creator = json_body['collectionCreator']
    res = collection_manager.add_collection(
        collection_name=collection_name, 
        collection_creator=collection_creator,
        collection_description=collection_description, 
        collection_visibility=collection_visibility, 
        collection_maintainers=collection_maintainers
    )
    return jsonify(res)

@collections.route('/get_user_collections', methods=['GET'])
@login_required
def get_user_collections():
    username = request.args.get('username')
    collections = collection_manager.get_user_collections(username=username)
    return jsonify(collections=collections)

@collections.route('/edit_collection', methods=['PUT'])
@login_required
def edit_collection():
    # json body contains updated data for same id
    json_body = request.get_json()
    collection_description = json_body['collection_description']
    collection_id = json_body['collection_id']
    collection_name = json_body['collection_name']
    collection_visibility = json_body['collection_visibility']
    maintainers = json_body['maintainers']
    username = json_body['username']
    updated = collection_manager.edit_collection(
        collection_description=collection_description,
        collection_id=collection_id,
        collection_name=collection_name,
        collection_visibility=collection_visibility,
        maintainers=maintainers,
        username=username
    )
    return jsonify(updated)

@collections.route('/delete_collection', methods=['DELETE'])
@login_required
def delete_collection():
    json_body = request.get_json()
    collection_id = json_body['collection_id']
    username = json_body['username']
    deleted = collection_manager.delete_collection(
        collection_id=collection_id,
        username=username
    )
    return jsonify(deleted)