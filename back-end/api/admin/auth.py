#!/usr/bin/env python3
""" module for route of authentication of admin to dashboard
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.admin import Admin


@admin_routes.route('/signin', methods=['POST'], strict_slashes=False)
def signin():
	""" sign in admin and create access token
			Return:
				- json of new access token with code 201 if successfull signin
				- json with msg if faild signin with code 401 if failed signin
	"""
	user_name = request.json.get('user_name', None)
	password = request.json.get('password', None)
	admin = Session.query(Admin).filter_by(user_name=user_name).first()
	if admin and check_password_hash(admin.password, password):
		access_token = create_access_token(identity=admin.id)
		return jsonify({'access_token': access_token}), 201
	else:
		return jsonify({'msg': 'Invalid user name or password'}), 401


@admin_routes.route('/state', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def admin_state():
	""" get state of current admin
			Return:
				- json of admin dictionary information with code 200
	"""
	admin = Session.query(Admin).filter_by(id=get_jwt_identity()).first()
	return jsonify(admin.to_dict()), 200
