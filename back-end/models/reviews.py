#!/usr/bin/env python3
""" module that create table of reviews inherite from Base
		of sqlalchemy and from Basemodel
"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer, ForeignKey

class Review(BaseModel, Base):
	""" class or models to create reviews tables in databases
			Columns:
				id: represnt id of each row in table using uuid library inherit from Basemodel
				created_at: date which that row is created inherit from Basemodel
				updated_at: date which that row is updated or modify inherit from Basemodel
				user_id: string represent user id
				doctor_id: string represent doctor id
				text: long string represent review details
				stars: represent number of stars given to doctor
	"""
	__tablename__ = 'reviews'
	user_id = Column(String(60), ForeignKey(users.id), nullable=False)
	doctor_id = Column(String(60), ForeignKey(doctors.id), nullable=False)
	text = Column(String(1024), nullable=True)
	stars = Column(Integer, nullable=False)
