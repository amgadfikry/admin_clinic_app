#!/usr/bin/env python3
""" module that create table of testimonials inherite from Base
		of sqlalchemy and from Basemodel
"""

# import Base and BaseModel provide ingeritance to table or model
from models.base_model import Base, BaseModel

# import rquired properties for creating databases columns in class
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean


class Testimonial(BaseModel, Base):
	""" class or models to create reviews tables in databases
			Columns:
				user_id: string represent user id as foreign key
				details: long string represent review details
				stars: integer represent number of stars given to doctor in review
	"""
	__tablename__ = 'testimonials'
	user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
	stars = Column(Integer, nullable=False)
	details = Column(String(1024), nullable=False)
	live = Column(Boolean, nullable=False, default=False)
