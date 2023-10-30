#!/usr/bin/env python3
""" module for route of manipulate with times table """

# import database starting session from models
from models import Session

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes, admin_required

# import neccessary parts from flask library
from flask import jsonify, request

# import create access token from jwt
from flask_jwt_extended import jwt_required

# import time table
from models.time import Time


@admin_routes.route('/time', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_time():
	"""text"""
	data = request.get_json()
	new_time = Time(**data)
	Session.add(new_time)
	Session.commit()
	return jsonify(new_time.to_dict()), 201


@admin_routes.route('/time/<time_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_time(time_id):
	""" text """
	time = Session.query(Time).filter_by(id=time_id).first()
	if request.method == 'DELETE':
		Session.delete(time)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		time.update(**data)
		Session.commit()
		return jsonify(time.to_dict()), 200


@admin_routes.route('/time', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_times():
	"""text"""
	times = Session.query(Time).all()
	time_dict = []
	for time in times:
		time_dict.append(time.to_dict())
	return jsonify(time_dict), 200
	