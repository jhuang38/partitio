from api.auth import auth, auth_service
from flask import jsonify, request

@auth.route('/create_user', methods=['POST'])
def create_new_user():
    json_body = request.get_json()
    username = json_body["username"]
    email = json_body["email"]
    password = json_body["password"]
    print(username, email, password)
    status = auth_service.create_user(username=username, email=email, password=password)
    return jsonify(status)


@auth.route('/test', methods=['GET', 'POST'])
def test():
    json_body = request.get_json()
    username = json_body["username"]
    email = json_body["email"]
    password = json_body["password"]
    user_exists = auth_service.user_exists(username, email)
    return jsonify(user_exists=user_exists)

@auth.route('/login', methods=['GET'])
def login():
    username = request.args.get('username')
    email = request.args.get('email')
    password = request.args.get('password')
    login_status = auth_service.login(username, email, password)
    pass

