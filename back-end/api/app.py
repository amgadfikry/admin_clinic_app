#!/usr/bin/env python3
""" main module that start flask app and configuartion of it """

# import neccessary parts from flask library
from flask import Flask, jsonify

# import database starting session from models
from models import Session

# import admin_routes that represent routes for all api of admins
from api.admin import admin_routes

# import jwtmanger from it's library
from flask_jwt_extended import JWTManager

# import timedelta for change time
from datetime import timedelta


# start Flask class
app = Flask('__name__')

# add secret key to flask app
app.config['secret_key'] = 'da9bf1fe5f672ddcea2f3d9634c31ce4d67d8b2d1fb61eac6f0ab29b81919f6f'

# add jwt secret key to secure access token
app.config['JWT_SECRET_KEY'] = 'f5f57a3d68f6b5d5891285bf0b99f58874e76ade5cf8adc418ff2873ab136b53'

# add expire time to access token of jwt
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)

# add flask app to JWTmanger class
jwt = JWTManager(app)

# add new blue prints of admin_routes
app.register_blueprint(admin_routes)


@app.teardown_appcontext
def close(self):
	""" function close session """
	Session.close()


if __name__ == '__main__':
	app.run(host='localhost')