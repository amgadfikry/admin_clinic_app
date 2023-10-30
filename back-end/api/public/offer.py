#!/usr/bin/env python3
""" module for route of manipulate with offers table """

# import database starting session from models
from models import Session


from api.public import public_routes

# import neccessary parts from flask library
from flask import jsonify, request

# import and offers table
from models.offer import Offer


@public_routes.route('/offer', methods=['GET'], strict_slashes=False)
def get_all_offers():
	"""text"""
	offers = Session.query(Offer).all()
	offer_dict = []
	for offer in offers:
		offer_dict.append(offer.to_dict())
	return jsonify(offer_dict), 200
