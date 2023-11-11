#!/usr/bin/env python3
""" module that create table of offers inherite from Base
		of sqlalchemy and from Basemodel
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from sqlalchemy.orm import column_property
from datetime import datetime


class Offer(BaseModel, Base):
	""" class or models to create offers tables in database
			Columns:
				title: string represent title of offer
				speciality_id: string represent speciality id as foreign key
				old_price: integer represent price before discount
				new_price: integer represent price after discount
				description: long string of details about offer
				image: binary represent image about offer
				expire_date: datetime represent expire date of offer
				percentage: decimal represent percentage of discount based on other columns
	"""
	__tablename__ = 'offers'
	title = Column(String(128), nullable=False)
	image = Column(LargeBinary(length=(2**32)-1), nullable=True)
	old_price = Column(Integer, nullable=False)
	new_price = Column(Integer, nullable=False)
	description = Column(String(1024), nullable=False)
	speciality_id = Column(String(60), ForeignKey('specialities.id'), nullable=False)
	expire_date = Column(String(60), nullable=False)
	percentage = column_property((old_price - new_price) / old_price * 100)
