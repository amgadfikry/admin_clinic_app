#!/usr/bin/env python3
""" module for route of authentication of user to dashboard """

# import database starting session from models
from models import Session

# import user_routes that represent routes for all api of admins
from api.user import user_routes, user_required

# import neccessary parts from flask library
from flask import jsonify, request

# import security library which hash and de-hash passwords
from werkzeug.security import generate_password_hash

# import create access token from jwt
from flask_jwt_extended import jwt_required, get_jwt_identity

# import user table
from models.user import User


@user_routes.route('/edit', methods=['PUT'], strict_slashes=False)
@jwt_required()
@user_required
def edit_user():
	""" text """
	user = Session.query(User).filter_by(id=get_jwt_identity()).first()
	data = request.get_json()
	if data.get('password', None):
		data['password'] = generate_password_hash(data.get('password'), 'sha256')
	user.update(**data)
	Session.commit()
	return jsonify(user.to_dict()), 200
