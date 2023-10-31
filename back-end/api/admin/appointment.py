#!/usr/bin/env python3
""" module for route of manipulate with appointment table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.appointment import Appointment


@admin_routes.route('/appointment/<appointment_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_appointment(appointment_id):
	""" update and delete appointment by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new appoinment with code 200 if put request
	"""
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
	""" get all appointemnts in tables
			Return:
				- json list of all appointements with code 200
	"""
	appointments = Session.query(Appointment).all()
	appointment_dict = []
	for appoint in appointments:
		appointment_dict.append(appoint.to_dict())
	return jsonify(appointment_dict), 200
