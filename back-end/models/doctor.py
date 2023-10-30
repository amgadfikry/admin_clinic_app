#!/usr/bin/env python3
""" module that create table of doctors inherite from Base
		of sqlalchemy and from Basemodel
"""

# import Base and BaseModel provide ingeritance to table or model
from models.base_model import BaseModel, Base

# import rquired properties for creating databases columns in class
from sqlalchemy import Column, String, Integer, ForeignKey, LargeBinary, Table

# import propety to create relationship with other tables
from sqlalchemy.orm import relationship


"""create secondary table that connect doctors table or Doctor model
	with times table or Time model
	Colums:
		doctor_id: string represent doctor id as foreign key
		time_id: string represent time id as foreign key
"""
doctor_time = Table('doctor_time', Base.metadata,
										Column('doctor_id',
														String(60),
														ForeignKey('doctors.id', onupdate='CASCADE', ondelete='CASCADE'),
														primary_key=True,
														nullable=False
														),
										Column('time_id',
														String(60),
														ForeignKey('times.id', onupdate='CASCADE', ondelete='CASCADE'),
														primary_key=True,
														nullable=False
														)
										)

class Doctor(BaseModel, Base):
	""" class or models to create doctors tables in database
			Columns:
				full_name: string represent doctor full name
				title: string represent title of doctor
				speciality_id: string represent speciality id as foreign key
				price: integer for price of examination
				details: long string of details about doctor
				image: binary represent image of doctor
				reviews: relationship with reviews tables or Review model with back refrence
					doctor in reviews table
				appointments: relationship with appointments tables or Appointment model with back refrence
					doctor in appointments table
				all_times: relationship with secondary table called doctor_time and back reference
					in times table with all_doctors
	"""
	__tablename__ = 'doctors'
	full_name = Column(String(256), nullable=False)
	speciality_id = Column(String(60), ForeignKey('specialities.id'), nullable=False)
	title = Column(String(128), nullable=False)
	image = Column(LargeBinary, nullable=True)
	price = Column(Integer, nullable=True)
	details = Column(String(1024), nullable=False)
	reviews = relationship("Review", backref="doctor", cascade='all, delete-orphan')
	appointments = relationship("Appointment", backref='doctor', cascade='all, delete-orphan')
	all_times = relationship('Time', secondary='doctor_time', 
												viewonly=False, backref='all_doctors')
	