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