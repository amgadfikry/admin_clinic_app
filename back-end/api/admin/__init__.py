#!/usr/bin/env python3
"""starting admin_routes blueprint module """

# import blueprint from flask library
from flask import Blueprint

# import create access token from jwt
from flask_jwt_extended import get_jwt_identity

# import database starting session from models
from models import Session

# import Admin table
from models.admin import Admin

from functools import wraps

# create new blueprint for admin_routes of api
admin_routes = Blueprint('admin_routes', __name__, url_prefix='/api/admin')


def admin_required(fn):
	@wraps(fn)
	def wrapper(*args, **kwargs):
		admin = Session.query(Admin).filter_by(id=get_jwt_identity()).first()
		if admin:
			return fn(*args, **kwargs)
		else:
			return jsonify({'msg': 'Admin privileges required'}), 403
	return wrapper


# reload modules if this blueprint is requested
if __name__ == 'api.admin':
	from api.admin.appointment import *
	from api.admin.auth import *
	from api.admin.doctor import *
	from api.admin.offer import *
	from api.admin.review import *
	from api.admin.speciality import *
	from api.admin.testimonial import *
	from api.admin.time import *
	from api.admin.user import *

