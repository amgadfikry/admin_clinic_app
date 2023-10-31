#!/usr/bin/env python3
""" module for route of manipulate with offers table
"""
from models import Session
from api.public import public_routes
from flask import jsonify, request
from models.offer import Offer


@public_routes.route('/offer', methods=['GET'], strict_slashes=False)
def get_all_offers():
	""" get all offers in tables with all details
			Return:
				- json list of all offers with code 200
	"""
	offers = Session.query(Offer).all()
	offer_dict = []
	for offer in offers:
		offer_dict.append(offer.to_dict())
	return jsonify(offer_dict), 200
