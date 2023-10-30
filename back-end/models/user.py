#!/usr/bin/env python3
""" module that create table of users inherite from Base
		of sqlalchemy and from Basemodel
"""

# import Base and BaseModel provide ingeritance to table or model
from models.base_model import BaseModel, Base

# import rquired properties for creating databases columns in class
from sqlalchemy import Column, String, LargeBinary

# import propety to create relationship with other tables
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
	""" class or models to create users tables in databases
			Columns:
				full_name: string represent user full name
				user_name: string represent user user name
				password:  hashed string represent password of user
				email: string represent email of user
				image: binary represent profile image of user
				reviews: relationship with reviews tables or Review model with back refrence
					user in reviews table
				appointments: relationship with appointments tables or Appointment model with back refrence
					user in appointments table
				testimonials: relationship with testimonials tables or Testimonial model with back refrence
					user in testimonials table
	"""
	__tablename__ = 'users'
	full_name = Column(String(256), nullable=False)
	user_name = Column(String(128), nullable=False)
	password = Column(String(128), nullable=False)
	email = Column(String(128), nullable=False)
	image = Column(LargeBinary, nullable=True)
	reviews = relationship("Review", backref="user")
	appointments = relationship("Appointment", backref='user', cascade='all, delete-orphan')
	testimonials = relationship('Testimonial', backref='user', cascade='all, delete-orphan')
	