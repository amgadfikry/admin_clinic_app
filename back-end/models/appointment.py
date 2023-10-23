#!/usr/bin/env python3
""" module that create table of appointments inherite from Base
		of sqlalchemy and from Basemodel
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime, ForeignKey


class Appointment(BaseModel, Base):
	""" class or models to create appointments tables in databases
			Columns:
				id: represnt id of each row in table using uuid library inherit from Basemodel
				created_at: date which that row is created inherit from Basemodel
				updated_at: date which that row is updated or modify inherit from Basemodel
				user_id: string represent user id
				doctor_id: string represent doctor id
				date: datetime represent date and time of appointemnt
	"""
	__tablename__ = 'users'
	user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
	doctor_id = Column(String(60), ForeignKey('doctors.id'), nullable=False)
	date = Column(DateTime, nullable=False)
	