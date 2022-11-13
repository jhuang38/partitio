from models import User, session_maker
from uuid import uuid4
from datetime import datetime

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

    def user_exists(self, username, email):
        """
        check for existing username in users
        """
        user = self.db.session.query(User).filter((User.username == username)).first()
        if not(user is None):
            print(user.__dict__)
        return not(user is None)

    def create_user(self, username, email, password):
        if self.user_exists(username, email):
            return dict(status='failure', error='Username already exists in database')
        hashed_password = self.generate_password_hash(password)
        uid = str(self.generate_uuid())
        user = User(uid = uid, username = username, email = email, password = hashed_password, created_time = datetime.now())
        self.db.session.add(user)
        self.db.session.commit()

        return dict(status='success', error=None)

    def login_user(self, username, email, password):
        user = self.db.session.query(User.username == username).first()

        pass
