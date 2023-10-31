#!/usr/bin/env python3
""" module for route of manipulate with appointment table
"""
from models import Session
from api.user import user_routes, user_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.appointment import Appointment


@user_routes.route('/appointment', methods=['POST'], strict_slashes=False)
@jwt_required()
@user_required
def create_appointment():
	""" create new appointment record
			Return:
				- json of created appointment with code 201
	"""
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
	""" delete appointment by it's id
			Return:
				- empty json with code 200
	"""
	appointment = Session.query(Appointment).filter_by(id=appointment_id).first()
	Session.delete(appointment)
	Session.commit()
	return jsonify({}), 200


@user_routes.route('/appointment', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def get_appointment():
	""" get all appointemnts related to user now in tables
			Return:
				- json list of all appointments with code 200
	"""
	appointments = Session.query(Appointment).filter_by(user_id=get_jwt_identity()).all()
	appointment_dict = []
	for app in appointments:
		appointment_dict.append(app.to_dict())
	return jsonify(appointment_dict), 200
