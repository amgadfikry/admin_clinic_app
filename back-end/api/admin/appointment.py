#!/usr/bin/env python3
""" module for route of manipulate with appointment table """

# import database starting session from models
from models import Session

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes, admin_required

# import neccessary parts from flask library
from flask import jsonify, request

# import create access token from jwt
from flask_jwt_extended import jwt_required

# import appointment table
from models.appointment import Appointment


@admin_routes.route('/appointment/<appointment_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_appointment(appointment_id):
	""" text """
	appointment = Session.query(Appointment).filter_by(id=appointment_id).first()
	if request.method == 'DELETE':
		Session.delete(appointment)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		appointment.update(**data)
		Session.commit()
		return jsonify(appointment.to_dict()), 200


@admin_routes.route('/appointment', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_all_appointment():
	"""text"""
	appointments = Session.query(Appointment).all()
	appointment_dict = []
	for appoint in appointments:
		appointment_dict.append(appoint.to_dict())
	return jsonify(appointment_dict), 200
