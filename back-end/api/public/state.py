#!/usr/bin/env python3
""" module for route of manipulate with doctor table """

# import database starting session from models
from models import Session

# import neccessary parts from flask library
from flask import jsonify, request

from api.public import public_routes

# import create access token from jwt
from flask_jwt_extended import get_jwt_identity, jwt_required

# import testimonial table
from models.user import User
from models.admin import Admin

@public_routes.route('/state', methods=['GET'], strict_slashes=False)
@jwt_required(optional=True)
def state_of_token():
	"""text"""
	try:
		token_id = get_jwt_identity()
		if token_id is None:
			return jsonify({'type': None})
		user = Session.query(User).filter_by(id=token_id).first()
		if user:
			return jsonify({'type': 'user'})
		admin = Session.query(Admin).filter_by(id=token_id).first()
		if admin:
			return jsonify({'type': 'admin'})
	except Exception:
		return jsonify({'type': None})
