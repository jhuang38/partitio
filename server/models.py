from sqlalchemy import Column, DateTime, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
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

    def __repr__(self):
        return f"{self.uid} - {self.username} - {self.email}"

session_maker = sessionmaker(bind=create_engine(os.environ.get('DB_URI')))
