#!/usr/bin/env python3
""" module for route of manipulate with testimonial table
"""
from models import Session
from flask import jsonify, request
from api.public import public_routes
from models.testimonial import Testimonial


@public_routes.route('/testimonial', methods=['GET'], strict_slashes=False)
def get_all_testimonials():
	""" get all testimonials which is live in tables with all details
			Return:
				- json list of all testimonials with code 200
	"""
	testimonials = Session.query(Testimonial).filter_by(live=True).all()
	testimonial_dict = []
	for testi in testimonials:
		testimonial_dict.append(testi.to_dict())
	return jsonify(testimonial_dict), 200