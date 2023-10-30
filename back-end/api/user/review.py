#!/usr/bin/env python3
""" module for route of authentication of user to dashboard """

# import database starting session from models
from models import Session

# import user_routes that represent routes for all api of admins
from api.user import user_routes, user_required

# import neccessary parts from flask library
from flask import jsonify, request

# import create access token from jwt
from flask_jwt_extended import jwt_required, get_jwt_identity

# import user table
from models.review import Review


@user_routes.route('/review', methods=['POST'], strict_slashes=False)
@jwt_required()
@user_required
def create_review():
	"""text"""
	data = request.get_json()
	data['user_id'] = get_jwt_identity()
	new_review = Review(**data)
	Session.add(new_review)
	Session.commit()
	return jsonify(new_review.to_dict()), 201


@user_routes.route('/review/<review_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@user_required
def delete_review(review_id):
	""" text """
	review = Session.query(Review).filter_by(id=review_id).first()
	Session.delete(review)
	Session.commit()
	return jsonify({}), 200


@user_routes.route('/review', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def get_review():
	""" text """
	reviews = Session.query(Review).filter_by(user_id=get_jwt_identity()).all()
	review_dict = []
	for rev in reviews:
		review_dict.append(rev.to_dict())
	return jsonify(review_dict), 200
