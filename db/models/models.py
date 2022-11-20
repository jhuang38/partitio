from sqlalchemy import Column, DateTime, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, reconstructor
from flask_login import UserMixin
import datetime
import os

Base = declarative_base()

class User(Base, UserMixin):
    __tablename__ = 'users'
    uid = Column(String(64), unique=True, nullable=False)
    username = Column(String(20), primary_key=True, nullable=False, unique=True)
    email = Column(String(320), nullable=False)
    password = Column(String(100))
    created_time = Column(DateTime)

    @reconstructor
    def init_on_load(self):
        self.auth_status = False
        self.active_status = True

    def __repr__(self):
        return f"{self.uid} - {self.username} - {self.email}"

    def get_id(self):
        return self.uid

    @property
    def is_active(self):
        return self.active_status

    @property
    def is_authenticated(self):
        return self.auth_status

    @property
    def is_anonymous(self):
        return False

    def set_active_status(self, state: bool):
        self.active_status = state
    
    def set_auth_status(self, state:bool):
        
        self.auth_status = state


session_maker = sessionmaker(bind=create_engine(os.environ.get('DB_URI')))


