#!/usr/bin/env python3
""" module that create table of doctors inherite from Base
		of sqlalchemy and from Basemodel
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey, LargeBinary, Table
from sqlalchemy.orm import relationship


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
	""" class or models to create doctors tables in databases
			Columns:
				id: represnt id of each row in table using uuid library inherit from Basemodel
				created_at: date which that row is created inherit from Basemodel
				updated_at: date which that row is updated or modify inherit from Basemodel
				full_name: string represent doctor full name
				title: string represent title of doctor
				speciality_id: string represent id of speciality
				price: integer for price of examination
				details: string of details of doctor
				image: binary represent image of doctor
	"""
	__tablename__ = 'doctors'
	full_name = Column(String(256), nullable=False)
	speciality_id = Column(String(60), ForeignKey, nullable=False)
	title = Column(String(128), nullable=False)
	image = Column(LargeBinary, nullable=True)
	price = Column(Integer, nullable=True)
	details = Column(String(1024), nullable=False)
	reviews = relationship("Review", backref="doctor")
	appointments = relationship("Appointment", backref='doctor')
	times = relationship('Time', secondary='doctor_time', 
												viewonly=False, backref='doctor_times'
											)
	