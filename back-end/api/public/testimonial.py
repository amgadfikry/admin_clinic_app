#!/usr/bin/env python3
""" module for route of manipulate with testimonial table """

# import database starting session from models
from models import Session

# import neccessary parts from flask library
from flask import jsonify, request

from api.public import public_routes

# import testimonial table
from models.testimonial import Testimonial


@public_routes.route('/testimonial', methods=['GET'], strict_slashes=False)
def get_all_testimonials():
	"""text"""
	testimonials = Session.query(Testimonial).filter_by(live=True).all()
	testimonial_dict = []
	for testi in testimonials:
		testimonial_dict.append(testi.to_dict())
	return jsonify(testimonial_dict), 200