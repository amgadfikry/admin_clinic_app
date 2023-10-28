#!/usr/bin/env python3
""" module for route of authentication of admin to dashboard """

# import database starting session from models
from models import Session

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes

# import neccessary parts from flask library
from flask import jsonify, request

# import security library which hash and de-hash passwords
from werkzeug.security import check_password_hash

# import create access token from jwt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# import Admin table
from models.admin import Admin


@admin_routes.route('/signin', methods=['POST'], strict_slashes=False)
def signin():
	""" function route that resposible for sign in to admin dashboard
			by check if admin user name asn password is correct or not
			and provide access token during session
			Return:
				access token if correct user name and password
				or msg if inavlid user or password
	"""
	user_name = request.json.get('user_name', None)
	password = request.json.get('password', None)
	admin = Session.query(Admin).filter_by(user_name=user_name).first()
	if admin and check_password_hash(admin.password, password):
		access_token = create_access_token(identity=admin.id)
		return jsonify({'access_token': access_token})
	else:
		return jsonify({'msg': 'Invalid user name or password'})


@admin_routes.route('/state', methods=['GET'], strict_slashes=False)
@jwt_required()
def admin_state():
	""" route function that check state of admin user
			Return:
				admin data if logged in 
				or return False
	"""
	admin = Session.query(Admin).filter_by(id=get_jwt_identity()).first()
	return jsonify(admin.to_dict())
