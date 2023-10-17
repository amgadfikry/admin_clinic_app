#!/usr/bin/env python3
""" model of database tables that hold all common features in all
		others models as created at, updated at, id
"""
from uuid import uuid4
from datetime import datetime
from sqlalchemy import Column, String, DateTime


class BaseModel:
	""" model that is base for other models prepresents tables
			inherit from Base class of sqlalchemy
			Columns:
				id: represnt id of each row in table using uuid library
				created_at: date which that row is created
				updated_at: date which that row is updated or modify
	"""
	id = Column(String(60), primary_key=True, nullable=False)
	created_at = Column(DateTime, nullable=False)
	updated_at = Column(DateTime, nullable=False)

	def __init__(self, *args, **kwargs={}):
		""" init magic method that initate the new value in start of class
				if new instance create new value
				if provide dictionary of value set values to rows
				ATTR:
					*args: list of arguments of function
					**kwargs: dictionary of values that add to rows
		"""
		for key, value in kwargs.items():
			if key != table_name:
				setattr(self, key, value)
		if kwargs.get('created_at'):
			self.created_at = kwargs['created_at']
		else:
			self.created_at = datetime.now()
		if kwargs.get('updated_at'):
			self.updated_at = kwargs['updated_at']
		else:
			self.updated_at = self.created_at
		if kwargs.get('id'):
			self.id = kwargs['id']
		else:
			self.id = str(uuid4())

	def to_dict(self):
		""" instance public method that convert class to dictionary with
				add new dict key and value about table name
		"""
		new_dict = {}
		for key, value in self.__dict__.items():
			setattr(new_dict, key, value)
		new_dict['table_name'] = self.__tablename__
		return new_dict
