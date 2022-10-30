from flask_bcrypt import Bcrypt
from models import User, session_maker
from uuid import uuid4
from datetime import datetime
from api import db

class Auth:
    def __init__(self):
        self.bcrypt = Bcrypt()
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

    def create_user(self, username, email, password):
        hashed_password = self.generate_password_hash(password)
        uid = str(self.generate_uuid())
        user = User(uid = uid, username = username, email = email, password = hashed_password, created_time = datetime.now())
        db.session.add(user)
        db.session.commit()
