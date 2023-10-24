#!/usr/bin/env python3
""" module that create table of specialities inherite from Base
		of sqlalchemy and from Basemodel
"""

# import Base and BaseModel provide ingeritance to table or model
from models.base_model import Base, BaseModel

# import rquired properties for creating databases columns in class
from sqlalchemy import Column, String, Integer

# import propety to create relationship with other tables
from sqlalchemy.orm import relationship


class Speciality(BaseModel, Base):
	""" class or models to create specialities tables in databases
			Columns:
				name: string represent name of speciality
				price: integer preresent default price of examination
				doctors: relationship with doctors tables or Doctor model with back refrence
					speciality in doctor table
				offers: relationship with offers tables or Offer model with back refrence
					speciality in offers table
	"""
	__tablename__ = 'specialities'
	name = Column(String(128), nullable=False)
	price = Column(Integer, nullable=False)
	doctors = relationship('Doctor', backref='speciality')
	offers = relationship('Offer', backref='speciality')
