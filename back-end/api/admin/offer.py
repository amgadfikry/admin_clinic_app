#!/usr/bin/env python3
""" module for route of manipulate with offers table """

# import database starting session from models
from models import Session

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes, admin_required

# import neccessary parts from flask library
from flask import jsonify, request

# import create access token from jwt
from flask_jwt_extended import jwt_required

# import and offers table
from models.offer import Offer


@admin_routes.route('/offer', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_offer():
	"""text"""
	data = request.get_json()
	new_offer = Offer(**data)
	Session.add(new_offer)
	Session.commit()
	return jsonify(new_offer.to_dict()), 201


@admin_routes.route('/offer/<offer_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_offer(offer_id):
	""" text """
	offer = Session.query(Offer).filter_by(id=offer_id).first()
	if request.method == 'DELETE':
		Session.delete(offer)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		offer.update(**data)
		Session.commit()
		return jsonify(offer.to_dict()), 200
