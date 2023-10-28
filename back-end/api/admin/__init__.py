#!/usr/bin/env python3
"""starting admin_routes blueprint module """

# import blueprint from flask library
from flask import Blueprint

# create new blueprint for admin_routes of api
admin_routes = Blueprint('admin_routes', __name__, url_prefix='/api/admin')

# reload modules if this blueprint is requested
if __name__ == 'api.admin':
	from api.admin.auth import *
