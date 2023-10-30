#!/usr/bin/env python3
"""starting user_routes blueprint module """

# import blueprint from flask library
from flask import Blueprint

# import create access token from jwt
from flask_jwt_extended import get_jwt_identity

# import database starting session from models
from models import Session

# import User table
from models.user import User

from functools import wraps

# create new blueprint for admin_routes of api
user_routes = Blueprint('user_routes', __name__, url_prefix='/api/user')


def user_required(fn):
	@wraps(fn)
	def wrapper(*args, **kwargs):
		user = Session.query(User).filter_by(id=get_jwt_identity()).first()
		if user:
			return fn(*args, **kwargs)
		else:
			return jsonify({'msg': 'User login required'}), 403
	return wrapper


# reload modules if this blueprint is requested
if __name__ == 'api.user':
	from api.user.appointment import *
	from api.user.auth import *
	from api.user.review import *
	from api.user.testimonial import *
	from api.user.user import *
