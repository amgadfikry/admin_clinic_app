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
from models.testimonial import Testimonial


@user_routes.route('/testimonial', methods=['POST'], strict_slashes=False)
@jwt_required()
@user_required
def create_testimonial():
	"""text"""
	data = request.get_json()
	data['user_id'] = get_jwt_identity()
	new_testimonial = Testimonial(**data)
	Session.add(new_testimonial)
	Session.commit()
	return jsonify(new_testimonial.to_dict()), 201


@user_routes.route('/testimonial/<testimonial_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@user_required
def delete_testimonial(testimonial_id):
	""" text """
	testimonial = Session.query(Testimonial).filter_by(id=testimonial_id).first()
	Session.delete(testimonial)
	Session.commit()
	return jsonify({}), 200


@user_routes.route('/testimonial', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def get_testimonial():
	""" text """
	testimonials = Session.query(Testimonial).filter_by(user_id=get_jwt_identity()).all()
	testimonial_dict = []
	for test in testimonials:
		testimonial_dict.append(test.to_dict())
	return jsonify(testimonial_dict), 200
