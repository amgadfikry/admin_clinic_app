#!/usr/bin/env python3
""" module that create table of times inherite from Base
		of sqlalchemy and from Basemodel
"""

# import Base and BaseModel provide ingeritance to table or model
from models.base_model import Base, BaseModel

# import rquired properties for creating databases columns in class
from sqlalchemy import Column, String, Integer

# import column property to use it to get column based on other columns values
from sqlalchemy.orm import column_property


class Time(BaseModel, Base):
	""" class or models to create times tables in databases
			Columns:
				day: string represent day of clinic
				start: string represent start of clinic in hours 24 format
				end: string represent end of clinic in hours 24 format
				max_patients: calculate numbers of pateints in hours of work based on other columns values
	"""
	__tablename__ = 'times'
	day = Column(String(60), nullable=False)
	start = Column(Integer, nullable=False)
	end = Column(Integer, nullable=False)
	max_patients = column_property((end - start) * 60 / 15) 
