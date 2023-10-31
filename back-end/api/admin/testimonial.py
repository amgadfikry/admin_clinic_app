#!/usr/bin/env python3
""" module for route of manipulate with testimonial table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.testimonial import Testimonial


@admin_routes.route('/testimonial/<testimonial_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_testimonial(testimonial_id):
	""" update and delete testimonial by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new testimonial with code 200 if put request
	"""
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
	""" get all testimonials in tables
			Return:
				- json list of all testimonials with code 200
	"""
	testimonials = Session.query(Testimonial).all()
	testimonial_dict = []
	for testi in testimonials:
		testimonial_dict.append(testi.to_dict())
	return jsonify(testimonial_dict), 200