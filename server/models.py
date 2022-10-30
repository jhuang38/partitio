from sqlalchemy import Column, DateTime, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime
import os

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    uid = Column(String(64), unique=True, nullable=False)
    username = Column(String(20), primary_key=True, nullable=False)
    email = Column(String(320), primary_key=True, nullable=False)
    password = Column(String(100))
    created_time = Column(DateTime)

session_maker = sessionmaker(bind=create_engine(os.environ.get('DB_URI')))
