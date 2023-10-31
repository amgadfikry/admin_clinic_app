#!/usr/bin/env python3
""" module for route of manipulate with speciality table
"""
from models import Session
from sqlalchemy import func
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.speciality import Speciality


@admin_routes.route('/speciality', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_speciality():
	""" create new speciality
			Return:
				- json of created speciality with code 201 if not exist
				- json of msg with failed if speciality is already exist with code 403
	"""
	data = request.get_json()
	exist = Session.query(Speciality).filter(func.lower(Speciality.name) == func.lower(data['name'])).first()
	if exist:
		return jsonify({'msg': 'already exist speciality'}), 403
	new_speciality = Speciality(**data)
	Session.add(new_speciality)
	Session.commit()
	return jsonify(new_speciality.to_dict()), 201


@admin_routes.route('/speciality/<speciality_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_speciality(speciality_id):
	""" update and delete doctor by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new speciality with code 200 if put request
	"""
	speciality = Session.query(Speciality).filter_by(id=speciality_id).first()
	if request.method == 'DELETE':
		Session.delete(speciality)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		speciality.update(**data)
		Session.commit()
		return jsonify(speciality.to_dict()), 200
