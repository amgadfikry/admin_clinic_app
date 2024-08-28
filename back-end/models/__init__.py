#!/usr/bin/env python3
""" init module that start directly when app run
		to connect with mysql database
		contain engine and session of all databases
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base_model import Base
from models.user import User
from models.appointment import Appointment
from models.doctor import Doctor
from models.review import Review
from models.speciality import Speciality
from models.time import Time
from models.offer import Offer
from models.testimonial import Testimonial
from models.admin import Admin
from werkzeug.security import generate_password_hash


# create engine with mysql database, user is api, host is local, and clinic_db database
engine = create_engine('mysql+mysqldb://api_test:test@mysql:3306/clinic_test_db')

# create all table by add it to metadata of Base class of sqlalchemy
Base.metadata.create_all(engine)

# create session and initiate it
session_creator = sessionmaker(bind=engine, expire_on_commit=False)
Session = scoped_session(session_creator)

# function make admin if not exists in database
def create_admin_if_not_exists():
	try:
		admin_exist = Session.query(Admin).filter_by(admin_name="admin").first()
		if not admin_exist:
			admin_data = {
			'admin_name': 'admin',
			'email': 'admin@example.com',
			'password': generate_password_hash('admin', method='scrypt'),
			'user_name': 'admin'
			}
			new_admin = Admin(**admin_data)
			Session.add(new_admin)
			Session.commit()
			print("Admin created successfully.")
		else:
			print("Admin already exists.")
	except Exception as e:
		Session.rollback()
		print(f"An error occurred: {e}")
	finally:
		Session.remove()

create_admin_if_not_exists()
