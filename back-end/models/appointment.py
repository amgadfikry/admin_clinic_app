#!/usr/bin/env python3
""" module that create table of appointments inherite from Base
		of sqlalchemy and from Basemodel
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class Appointment(BaseModel, Base):
	""" class or models to create appointments tables in databases
			Columns:
				user_id: string represent user id as foreign key
				doctor_id: string represent doctor id as foreign key
				date: datetime represent date and time of appointemnt
	"""
	__tablename__ = 'appointments'
	user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
	doctor_id = Column(String(60), ForeignKey('doctors.id'), nullable=False)
	date = Column(String(60), nullable=False)
	