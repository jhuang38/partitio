from models import User, session_maker
from uuid import uuid4
from datetime import datetime
from flask_login import login_user, logout_user, current_user
from flask import session

class Auth:
    def __init__(self, db, bcrypt):
        self.db = db
        self.bcrypt = bcrypt
        self.session_maker = session_maker

    def generate_password_hash(self, password):
        return self.bcrypt.generate_password_hash(password).decode("utf-8")

    def check_passwords(self, input_password, hashed_password):
        """
        input_password - input password, input from user
        hashed_password - hashed password from db
        output - true if passwords match, false otherwise
        """
        return self.bcrypt.check_password_hash(hashed_password, input_password)
    
    def generate_uuid(self):
        return str(uuid4())

    def user_exists(self, username):
        """
        check for existing username in users
        """
        user = self.db.session.query(User).filter((User.username == username)).first()
        return not(user is None)

    def create_user(self, username, email, password):
        if self.user_exists(username):
            return dict(status='failure', error='Username already exists in database.')
        hashed_password = self.generate_password_hash(password)
        uid = str(self.generate_uuid())
        user = User(uid = uid, username = username, email = email, password = hashed_password, created_time = datetime.now())
        self.db.session.add(user)
        self.db.session.commit()

        return dict(status='success', error=None)

    def login_user(self, username, email, password) -> dict:
        user = self.db.session.query(User).filter(User.username == username).first()
        login_status = False
        if user and self.check_passwords(password, user.password):
            login_status = login_user(user, remember=True)
        auth_status = 'failed'
        auth_error = 'Auth failed - check username and/or password credentials.'
        auth_user = {}
        if user and login_status:
            auth_status = 'success'
            auth_error ='None.'
            auth_user = {
                'username': user.username,
                'email': user.email,
                'uid': user.uid
            }
        # else:
        #     print('login failed')

        return dict(auth_status=auth_status, auth_error=auth_error, auth_user=auth_user)
    
    def get_user_by_name(self, username) -> User:
        return self.db.session.query(User).filter(User.username == username).first()
    
    def get_user_status(self, username) -> dict:
        user = self.db.session.query(User).filter(User.username == username).first()
        return dict(active=user.is_active, authenticated=user.is_authenticated)

    def logoff_user(self):
        logout_user()
        res = {
            'status': 'success',
            'error': None
        }
        return dict(res)

