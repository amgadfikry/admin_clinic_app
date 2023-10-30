#!/usr/bin/env python3
"""starting public_routes blueprint module """

# import blueprint from flask library
from flask import Blueprint

# import database starting session from models
from models import Session

# create new blueprint for admin_routes of api
public_routes = Blueprint('public_routes', __name__, url_prefix='/api/public')


# reload modules if this blueprint is requested
if __name__ == 'api.public':
	from api.public.testimonial import *
	from api.public.offer import *
	from api.public.doctor import *
	from api.public.speciality import *
	from api.public.state import *
