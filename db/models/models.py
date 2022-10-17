from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    uid = Column(Integer, unique=True, nullable=False)
    username = Column(String(20), primary_key=True, nullable=False)
    email = Column(String(320), primary_key=True, nullable=False)
    created_time = Column(DateTime)
