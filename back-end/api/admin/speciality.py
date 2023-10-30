#!/usr/bin/env python3
""" module for route of manipulate with speciality table """

# import database starting session from models
from models import Session

from sqlalchemy import func

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes, admin_required

# import neccessary parts from flask library
from flask import jsonify, request

# import create access token from jwt
from flask_jwt_extended import jwt_required

# import speciality table
from models.speciality import Speciality


@admin_routes.route('/speciality', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_speciality():
	"""text"""
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
	""" text """
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
