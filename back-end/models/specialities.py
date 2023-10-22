#!/usr/bin/env python3
""" module that create table of specialities inherite from Base
		of sqlalchemy and from Basemodel
"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Speciality(BaseModel, Base):
	""" class or models to create specialities tables in databases
			Columns:
				id: represnt id of each row in table using uuid library inherit from Basemodel
				created_at: date which that row is created inherit from Basemodel
				updated_at: date which that row is updated or modify inherit from Basemodel
				name: string represent name of speciality
				price: integer preresent default price
	"""
	__tablename__ = 'reviews'
	name = Column(String(128), nullable=False)
	price = Column(Integer, nullable=False)
	doctors = relationship('Doctor', backref='speciality')
