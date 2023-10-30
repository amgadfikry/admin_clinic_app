#!/usr/bin/env python3
""" module for route of manipulate with reviews table """

# import database starting session from models
from models import Session

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes, admin_required

# import neccessary parts from flask library
from flask import jsonify

# import create access token from jwt
from flask_jwt_extended import jwt_required

# import reviews table
from models.review import Review


@admin_routes.route('/review/<review_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def delete_review(review_id):
	""" text """
	review = Session.query(Review).filter_by(id=review_id).first()
	Session.delete(review)
	Session.commit()
	return jsonify({}), 200
