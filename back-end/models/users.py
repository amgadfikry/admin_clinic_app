#!/usr/bin/env python3
""" module that create table of users inherite from Base
		of sqlalchemy and from Basemodel
"""
from models import Base
from models.base_model import BaseModel
from sqlalchemy import Column, String, Int, LargeBinary


class Users(BaseModel, Base):
	""" class or models to create users tables in databases
			Columns:
				id: represnt id of each row in table using uuid library inherit from Basemodel
				created_at: date which that row is created inherit from Basemodel
				updated_at: date which that row is updated or modify inherit from Basemodel
				full_name: string represent user full name
				password: string represent password of user
				email: string represent email of user
				image: dinary data to save profile image
	"""
	__tablename__ = 'users'
	full_name = Column(String(256), nullable=False)
	password = Column(String(128), nullable=False)
	email = Column(String(128), nullable=False)
	image = Column(LargeBinary, nullable=True)