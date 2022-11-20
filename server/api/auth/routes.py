from api.auth import auth, auth_service
from flask import jsonify, request
from flask_login import login_user, logout_user, login_required, current_user
from models import User
import jwt
import datetime
import os

@auth.route('/create_user', methods=['POST'])
def create_new_user():
    json_body = request.get_json()
    username = json_body["username"]
    email = json_body["email"]
    password = json_body["password"]
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
    auth_headers = request.headers.get('Authorization', '').split()
    if len(auth_headers) == 2:
        try:
            token = jwt.decode(auth_headers[1], os.environ.get('FLASK_SECRET_KEY'), algorithms='HS256')
            jwt_username = token['username']
            jwt_email = token['email']
            jwt_uid = token['uid']
            user = auth_service.get_user_by_name(jwt_username)
            login_result = login_user(user=user, remember=True)
            if login_result:
                print('token login')
                return jsonify({
                'auth_status': 'success',
                'auth_error': 'None.',
                'auth_user': {
                    'username': jwt_username,
                    'email': jwt_email,
                    'uid': jwt_uid
                },
                'token': token
                })
            else:
                logout_user()
            user.set_auth_status(login_result)
        except Exception as e:
            print('exception', e)
            logout_user()
    login_status = auth_service.login_user(username, email, password)
    if login_status['auth_status'] == 'success':
        print('regular login')
        token = jwt.encode({'username': login_status['auth_user']['username'], 'uid': login_status['auth_user']['uid'], 'email': login_status['auth_user']['email'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, os.environ.get('FLASK_SECRET_KEY'), algorithm='HS256')
        return jsonify({
            'auth_status': login_status['auth_status'],
            'auth_error': login_status['auth_error'],
            'auth_user': login_status['auth_user'],
            'token': token
        })
    return jsonify(login_status)

@auth.route('/test_session', methods=['GET'])
def test_session():
    username = request.args.get('username')
    return jsonify(test=auth_service.get_user_status(username))

@auth.route('/current_user', methods=['GET'])
def get_current_user():
    print(current_user)
    print(current_user.is_anonymous)
    return jsonify(is_auth=current_user.is_authenticated)

@auth.route('/logout', methods=['POST'])
@login_required
def logout_user():
    try:
        response = auth_service.logoff_user()
        print(current_user.is_authenticated)
        return jsonify(response)
    except Exception as e:
        response = {
            'status': 'fail',
            'error': str(e)
        }
        return jsonify(response)
    