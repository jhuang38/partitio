from api.auth import auth
from flask import jsonify, request

@auth.route('/create-user', methods=['POST'])
def create_new_user():
    json_body = request.get_json()
    print(json_body)
    return jsonify(status='success')


@auth.route('/test', methods=['GET', 'POST'])
def test():
    print('hi')
    return jsonify({"hi":"hi"})

