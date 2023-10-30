#!/usr/bin/env python3
""" module for route of manipulate with offers table """

# import database starting session from models
from models import Session


from api.public import public_routes

# import neccessary parts from flask library
from flask import jsonify, request

# import and offers table
from models.speciality import Speciality


@public_routes.route('/speciality', methods=['GET'], strict_slashes=False)
def get_all_specialitys():
	"""text"""
	specialities = Session.query(Speciality).all()
	speciality_dict = []
	for speciality in specialities:
		speciality_dict.append(speciality.to_dict())
	return jsonify(speciality_dict), 200
