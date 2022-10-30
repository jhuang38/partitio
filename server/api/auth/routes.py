from api.auth import auth, auth_service
from flask import jsonify, request

@auth.route('/create_user', methods=['POST'])
def create_new_user():
    json_body = request.get_json()
    username = json_body["username"]
    email = json_body["email"]
    password = json_body["password"]
    print(username, email, password)
    auth_service.create_user(username=username, email=email, password=password)
    return jsonify(status='success')


@auth.route('/test', methods=['GET', 'POST'])
def test():
    print('hi')
    return jsonify({"hi":"hi"})

