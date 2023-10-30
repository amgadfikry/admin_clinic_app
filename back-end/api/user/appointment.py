#!/usr/bin/env python3
""" module for route of authentication of user to dashboard """

# import database starting session from models
from models import Session

# import user_routes that represent routes for all api of admins
from api.user import user_routes, user_required

# import neccessary parts from flask library
from flask import jsonify, request

# import create access token from jwt
from flask_jwt_extended import jwt_required, get_jwt_identity

# import user table
from models.appointment import Appointment


@user_routes.route('/appointment', methods=['POST'], strict_slashes=False)
@jwt_required()
@user_required
def create_appointment():
	"""text"""
	data = request.get_json()
	data['user_id'] = get_jwt_identity()
	new_appointment = Appointment(**data)
	Session.add(new_appointment)
	Session.commit()
	return jsonify(new_appointment.to_dict()), 201


@user_routes.route('/appointment/<appointment_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@user_required
def delete_appointment(appointment_id):
	""" text """
	appointment = Session.query(Appointment).filter_by(id=appointment_id).first()
	Session.delete(appointment)
	Session.commit()
	return jsonify({}), 200


@user_routes.route('/appointment', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def get_appointment():
	""" text """
	appointments = Session.query(Appointment).filter_by(user_id=get_jwt_identity()).all()
	appointment_dict = []
	for app in appointments:
		appointment_dict.append(app.to_dict())
	return jsonify(appointment_dict), 200
