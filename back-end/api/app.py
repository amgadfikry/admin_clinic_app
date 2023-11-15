#!/usr/bin/env python3
""" main module that start flask app and configuartion of it's
		blueprints and JWTManger
"""
from flask import Flask, jsonify
from models import Session
from api.admin import admin_routes
from api.user import user_routes
from api.public import public_routes
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS


# start Flask class
app = Flask('__name__')

# allow cors for api
CORS(app, resources={r'/api/*': {'origins': '*'}})

# add secret key to flask app
app.config['secret_key'] = 'da9bf1fe5f672ddcea2f3d9634c31ce4d67d8b2d1fb61eac6f0ab29b81919f6f'

# add jwt secret key to secure access token
app.config['JWT_SECRET_KEY'] = 'f5f57a3d68f6b5d5891285bf0b99f58874e76ade5cf8adc418ff2873ab136b53'

# add expire time to access token of jwt
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

# add flask app to JWTmanger class
jwt = JWTManager(app)

# add new blue prints of admin_routes
app.register_blueprint(admin_routes)

# add new blue prints of user_routes
app.register_blueprint(user_routes)

# add new blue prints of public_routes
app.register_blueprint(public_routes)


@app.teardown_appcontext
def close(self):
	""" function close session after end of it"""
	Session.close()


if __name__ == '__main__':
	""" run flask app on localhost """
	app.run(host='0.0.0.0', port=5000)