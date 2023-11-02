#!/usr/bin/env python3
""" module for route of authentication of user to dashboard
"""
from models import Session
from api.user import user_routes, user_required
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from models.appointment import Appointment
from models.review import Review
from models.testimonial import Testimonial

@user_routes.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
	""" signup user and create new user
			Return:
				- json of msg successfull signup
	"""
	data = request.get_json()
	data['password'] = generate_password_hash(data.get('password'), method='scrypt')
	new_user = User(**data)
	Session.add(new_user)
	Session.commit()
	return jsonify({'msg': 'signup success'}), 201


@user_routes.route('/signin', methods=['POST'], strict_slashes=False)
def signin():
	""" sign in user and create access token
			Return:
				- json of new access token with code 201 if successfull signin
				- json with msg if faild signin with code 401 if failed signin
	"""
	user_name = request.json.get('user_name', None)
	password = request.json.get('password', None)
	user = Session.query(User).filter_by(user_name=user_name).first()
	if user and check_password_hash(user.password, password):
		access_token = create_access_token(identity=user.id)
		return jsonify({'access_token': access_token}), 200
	else:
		return jsonify({'msg': 'Invalid user name or password'}), 401


@user_routes.route('/state', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def user_state():
	""" get state of current user
			Return:
				- json of user dictionary information with code 200
	"""
	user = Session.query(User).filter_by(id=get_jwt_identity()).first()
	user_dict = user.to_dict()
	reviews_dict = []
	for review in user.reviews:
		reviews_dict.append(review.to_dict())
	user_dict['reviews'] = reviews_dict
	appointments_dict = []
	for appointment in user.appointments:
		appointments_dict.append(appointment.to_dict())
	user_dict['appointments'] = appointments_dict
	testimonial_dict = []
	for testi in user.testimonials:
		testimonial_dict.append(testi.to_dict())
	user_dict['testimonials'] = testimonial_dict
	return jsonify(user_dict), 200
