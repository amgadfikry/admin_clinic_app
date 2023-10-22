#!/usr/bin/env python3
""" module that create table of times inherite from Base
		of sqlalchemy and from Basemodel
"""
from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import column_property

class Time(BaseModel, Base):
	""" class or models to create times tables in databases
			Columns:
				id: represnt id of each row in table using uuid library inherit from Basemodel
				created_at: date which that row is created inherit from Basemodel
				updated_at: date which that row is updated or modify inherit from Basemodel
				day: string represent day of clinic
				start: string represent start of hours
				end: string represent end of hours
				max_patients: calculate numbers of pateints in hours work
	"""
	__tablename__ = 'reviews'
	day = Column(String(60), nullable=False)
	start = Column(Integer, nullable=False)
	end = Column(Integer, nullable=False)
	max_patients = column_property(int((end - start) / 2))
