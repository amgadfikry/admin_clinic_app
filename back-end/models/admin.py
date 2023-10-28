#!/usr/bin/env python3
""" module that create table of admin inherite from Base
		of sqlalchemy and from Basemodel
"""

# import Base and BaseModel provide ingeritance to table or model
from models.base_model import BaseModel, Base

# import rquired properties for creating databases columns in class
from sqlalchemy import Column, String, LargeBinary


class Admin(BaseModel, Base):
	""" class or models to create admins tables in databases
			Columns:
				admin_name: string represent admin full name
				admin_name: string represent admin user_name
				password:  hashed string represent password of admin
				email: string represent email of admin
				image: binary represent profile image of admin
	"""
	__tablename__ = 'admins'
	admin_name = Column(String(256), nullable=False)
	user_name = Column(String(256), nullable=False)
	password = Column(String(128), nullable=False)
	email = Column(String(128), nullable=False)
	image = Column(LargeBinary, nullable=True)
	