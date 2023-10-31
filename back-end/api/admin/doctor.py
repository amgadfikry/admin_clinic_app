#!/usr/bin/env python3
""" module for route of manipulate with doctor table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.doctor import Doctor
from models.time import Time
from models.appointment import Appointment
from models.review import Review
from models.speciality import Speciality


@admin_routes.route('/doctor', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_doctor():
	""" create new doctor record
			Return:
				- json of created doctor with code 201
	"""
	data = request.get_json()
	new_doctor = Doctor(**data)
	Session.add(new_doctor)
	Session.commit()
	return jsonify(new_doctor.to_dict()), 201


@admin_routes.route('/doctor/<doctor_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_doctor(doctor_id):
	""" update and delete doctor by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new doctor with code 200 if put request
	"""
	doctor = Session.query(Doctor).filter_by(id=doctor_id).first()
	if request.method == 'DELETE':
		Session.delete(doctor)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		doctor.update(**data)
		Session.commit()
		return jsonify(doctor.to_dict()), 200


@admin_routes.route('/doctor/times/<doctor_id>/<time_id>', methods=['PATCH', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def add_times(doctor_id, time_id):
	""" add new time record to record or remove it
			Return:
				- empty json with code 200 if delete request
				- json of time added with code 200 if patch request
	"""
	doctor = Session.query(Doctor).filter_by(id=doctor_id).first()
	time = Session.query(Time).filter_by(id=time_id).first()
	if request.method == 'PATCH':
		doctor.all_times.append(time)
		Session.commit()
		return jsonify(time.to_dict()), 200
	else:
		doctor.all_times.remove(time)
		Session.commit()
		return jsonify({}), 200


@admin_routes.route('/doctor', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_all_doctors():
	""" get all doctors in tables with all details
			Return:
				- json list of all doctors with code 200
	"""
	doctors = Session.query(Doctor).all()
	doctors_dict = []
	for doc in doctors:
		doc_dict = doc.to_dict()
		doc_dict['speciality_id'] = Session.query(Speciality).filter_by(id=doc.speciality_id).first().to_dict()
		reviews_dict = []
		stars = 0
		for review in doc.reviews:
			stars = stars + review.stars
			reviews_dict.append(review.to_dict())
		if len(doc.reviews):
			stars_result = stars / len(doc.reviews)
		else:
			stars_result = 'Not rated yet'
		doc_dict['stars'] = stars_result
		doc_dict['reviews'] = reviews_dict
		appointments_dict = []
		for appointment in doc.appointments:
			appointments_dict.append(appointment.to_dict())
		doc_dict['appointments'] = appointments_dict
		times_dict = []
		for time in doc.all_times:
			times_dict.append(time.to_dict())
		doc_dict['all_times'] = times_dict
		doctors_dict.append(doc_dict)
	return jsonify(doctors_dict), 200


@admin_routes.route('/doctor/<time_id>', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_doctors_by_time(time_id):
	""" get all doctor by specific time id
			Return:
				- json list of all doctors with code 200
	"""
	time = Session.query(Time).filter_by(id=time_id).first()
	doctors_dict = []
	for doc in time.all_doctors:
		doc_dict = doc.to_dict()
		doc_dict['speciality_id'] = Session.query(Speciality).filter_by(id=doc.speciality_id).first().to_dict()
		reviews_dict = []
		stars = 0
		for review in doc.reviews:
			stars = stars + review.stars
			reviews_dict.append(review.to_dict())
		if len(doc.reviews):
			stars_result = stars / len(doc.reviews)
		else:
			stars_result = 'Not rated yet'
		doc_dict['stars'] = stars_result
		doc_dict['reviews'] = reviews_dict
		appointments_dict = []
		for appointment in doc.appointments:
			appointments_dict.append(appointment.to_dict())
		doc_dict['appointments'] = appointments_dict
		doctors_dict.append(doc_dict)
	return jsonify(doctors_dict), 200
