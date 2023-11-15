#!/usr/bin/env python3
""" create new admin and add it to table of admins """
from werkzeug.security import generate_password_hash
from models import Session
from models.admin import Admin

admin_data = {'admin_name': 'admin', 'email': 'admin',
	'password': generate_password_hash('admin', method='scrypt'), 'user_name': 'admin'}

new_admin = Admin(**admin_data)
Session.add(new_admin)
Session.commit()
Session.close()