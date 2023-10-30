#!/usr/bin/env python3
""" module for route of manipulate with testimonial table """

# import database starting session from models
from models import Session

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes, admin_required

# import neccessary parts from flask library
from flask import jsonify, request

# import create access token from jwt
from flask_jwt_extended import jwt_required

# import testimonial table
from models.testimonial import Testimonial


@admin_routes.route('/testimonial/<testimonial_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_testimonial(testimonial_id):
	""" text """
	testimonial = Session.query(Testimonial).filter_by(id=testimonial_id).first()
	if request.method == 'DELETE':
		Session.delete(testimonial)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		testimonial.update(**data)
		Session.commit()
		return jsonify(testimonial.to_dict()), 200


@admin_routes.route('/testimonial', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_all_testimonials():
	"""text"""
	testimonials = Session.query(Testimonial).all()
	testimonial_dict = []
	for testi in testimonials:
		testimonial_dict.append(testi.to_dict())
	return jsonify(testimonial_dict), 200