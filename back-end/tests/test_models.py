#!/usr/bin/env python3
"""module to test all models of sqlalchemy columns, relationships
	 and secondary tables
"""

# import unittest libraty
import unittest

# import datetime library to get and set current time
from datetime import datetime

# import require objects to start sqlalchemy session and engine
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

# import Base object of sqlalchemy from base_model class and import BaseModel which
# is main model for others models
from models.base_model import Base, BaseModel

# import all models that represents tables of database before create them
from models.user import User
from models.appointment import Appointment
from models.doctor import Doctor
from models.review import Review
from models.speciality import Speciality
from models.time import Time
from models.offer import Offer
from models.testimonial import Testimonial
from models.admin import Admin


class Test_models(unittest.TestCase):
	""" create new class inherit from library of unittest to test all
			Param:
				inherite TestCase from unittest lbrary TestCase
	"""

	@classmethod
	def setUpClass(cls):
		""" method that setup values during entire class before tests start"""
		# create engine with mysql database, user is api, host is local, and clinic_db database
		cls.engine = create_engine('mysql+mysqldb://api_test@localhost/clinic_test_db')
		# create session and initiate it
		cls.session_creator = sessionmaker(bind=cls.engine)
		cls.session = scoped_session(cls.session_creator)
		# create all table by add it to metadata of Base class of sqlalchemy
		Base.metadata.create_all(cls.engine)

	@classmethod
	def tearDownClass(cls):
		"""Clean up resources after class end and remove tables"""
		cls.session.close()
		cls.engine.dispose()
		Base.metadata.drop_all(cls.engine)

	def test_01_user_creation(self):
		"""test of creation new user and data of users"""
		user_data = {'full_name': 'moaz amgad', 'email': 'moaz_amgad@yahoo.com', 'password': '343432',
			'user_name': 'maoz@22'}
		new_user = User(**user_data)
		self.session.add(new_user)
		self.session.commit()
		result = self.session.query(User).filter_by(full_name=user_data['full_name']).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.full_name, user_data['full_name'])
		self.assertEqual(result.user_name, user_data['user_name'])
		self.assertEqual(result.email, user_data['email'])
		self.assertEqual(result.password, user_data['password'])

	def test_02_testimonial_creation(self):
		""" test of creation new testimonials and data of it"""
		user = self.session.query(User).first()
		testimonial_data = {'stars': 5, 'details': 'pla pla pla pla pla', 'user_id': user.id}
		new_testimonial = Testimonial(**testimonial_data)
		self.session.add(new_testimonial)
		self.session.commit()
		result = self.session.query(Testimonial).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.stars, testimonial_data['stars'])
		self.assertEqual(result.details, testimonial_data['details'])

	def test_03_user_testimonial_relation(self):
		""" test of relationship between testimonial and users """
		user = self.session.query(User).first()
		testimonial = self.session.query(Testimonial).first()
		self.assertEqual(user.testimonials[0], testimonial)
		self.assertEqual(testimonial.user, user)

	def test_04_speciality_creation(self):
		""" test creation of new speciality and it's data """
		speciality_data = {'name': 'orthopedic', 'price': 300}
		new_speciality = Speciality(**speciality_data)
		self.session.add(new_speciality)
		self.session.commit()
		result = self.session.query(Speciality).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.name, speciality_data['name'])
		self.assertEqual(result.price, speciality_data['price'])

	def test_05_offers_creation(self):
		""" test creation of new offer andot's data """
		speciality = self.session.query(Speciality).first()
		offer_data = {'title': 'surgery', 'old_price': 300, 'new_price': 150, 'description': 'pla pla pla',
			'speciality_id': speciality.id, 'expire_date': datetime(2024, 12, 30)}
		new_offer = Offer(**offer_data)
		self.session.add(new_offer)
		self.session.commit()
		result = self.session.query(Offer).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.title, offer_data['title'])
		self.assertEqual(result.old_price, offer_data['old_price'])
		self.assertEqual(result.new_price, offer_data['new_price'])
		self.assertEqual(result.description, offer_data['description'])
		self.assertEqual(result.speciality_id, offer_data['speciality_id'])
		self.assertEqual(result.expire_date, offer_data['expire_date'])
		self.assertEqual(result.percentage, (result.old_price - result.new_price) / result.old_price * 100)

	def test_06_offer_speciality_relation(self):
		""" test of relationship between offers and specialities """
		offer = self.session.query(Offer).first()
		speciality = self.session.query(Speciality).first()
		self.assertEqual(speciality.offers[0], offer)
		self.assertEqual(offer.speciality, speciality)

	def test_07_doctor_creation(self):
		""" test creation of new doctor and it's data """
		speciality = self.session.query(Speciality).first()
		doctor_data = {'full_name': 'amgad', 'speciality_id': speciality.id, 'title': 'dcotor',
			'price': 500, 'details': 'pla pla pla'}
		new_doctor = Doctor(**doctor_data)
		self.session.add(new_doctor)
		self.session.commit()
		result = self.session.query(Doctor).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.full_name, doctor_data['full_name'])
		self.assertEqual(result.speciality_id, doctor_data['speciality_id'])
		self.assertEqual(result.title, doctor_data['title'])
		self.assertEqual(result.price, doctor_data['price'])
		self.assertEqual(result.details, doctor_data['details'])

	def test_08_doctor_speciality_relation(self):
		""" test of relationship between doctors and specialities """
		doctor = self.session.query(Doctor).first()
		speciality = self.session.query(Speciality).first()
		self.assertEqual(speciality.doctors[0], doctor)
		self.assertEqual(doctor.speciality, speciality)

	def test_09_appointment_creation(self):
		""" test of creation new appointment and data of it"""
		user = self.session.query(User).first()
		doctor = self.session.query(Doctor).first()
		appointment_data = {'user_id': user.id, 'doctor_id': doctor.id, 'date': datetime(2023, 10, 30)}
		new_appointment = Appointment(**appointment_data)
		self.session.add(new_appointment)
		self.session.commit()
		result = self.session.query(Appointment).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.user_id, appointment_data['user_id'])
		self.assertEqual(result.doctor_id, appointment_data['doctor_id'])
		self.assertEqual(result.date, appointment_data['date'])

	def test_10_appointment_user_relation(self):
		""" test of relationship between appointments and users """
		user = self.session.query(User).first()
		appointment = self.session.query(Appointment).first()
		self.assertEqual(user.appointments[0], appointment)
		self.assertEqual(appointment.user, user)

	def test_11_appointment_doctor_relation(self):
		""" test of relationship between appointments and doctors """
		doctor = self.session.query(Doctor).first()
		appointment = self.session.query(Appointment).first()
		self.assertEqual(doctor.appointments[0], appointment)
		self.assertEqual(appointment.doctor, doctor)

	def test_12_review_creation(self):
		""" test of creation new review and data of it"""
		user = self.session.query(User).first()
		doctor = self.session.query(Doctor).first()
		review_data = {'user_id': user.id, 'doctor_id': doctor.id, 'text': 'pla pla', 'stars': 5}
		new_review = Review(**review_data)
		self.session.add(new_review)
		self.session.commit()
		result = self.session.query(Review).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.user_id, review_data['user_id'])
		self.assertEqual(result.doctor_id, review_data['doctor_id'])
		self.assertEqual(result.text, review_data['text'])
		self.assertEqual(result.stars, review_data['stars'])

	def test_13_review_user_relation(self):
		""" test of relationship between reviews and users """
		user = self.session.query(User).first()
		review = self.session.query(Review).first()
		self.assertEqual(user.reviews[0], review)
		self.assertEqual(review.user, user)

	def test_14_review_doctor_relation(self):
		""" test of relationship between review and doctors """
		doctor = self.session.query(Doctor).first()
		review = self.session.query(Review).first()
		self.assertEqual(doctor.reviews[0], review)
		self.assertEqual(review.doctor, doctor)

	def test_15_time_creation(self):
		""" test creation of new time and it's data """
		time_data = {'day': 'sunday', 'start': 18, 'end': 20}
		new_time = Time(**time_data)
		self.session.add(new_time)
		self.session.commit()
		result = self.session.query(Time).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.day, time_data['day'])
		self.assertEqual(result.start, time_data['start'])
		self.assertEqual(result.end, time_data['end'])
		self.assertEqual(result.max_patients, (result.end - result.start) * 60 / 15)

	def test_16_secondary_table_doctor_time(self):
		""" test of secondary table doctor_time between review and doctors """
		doctor = self.session.query(Doctor).first()
		time = self.session.query(Time).first()
		doctor.all_times.append(time)
		self.assertEqual(doctor.all_times[0], time)
		self.assertEqual(time.all_doctors[0], doctor)

	def test_17_admin_creation(self):
		"""test of creation new admin and data of admin"""
		admin_data = {'admin_name': 'moaz', 'email': 'moaz_amgad@yahoo.com', 'password': '343432',
			'user_name': 'admin'}
		new_admin = Admin(**admin_data)
		self.session.add(new_admin)
		self.session.commit()
		result = self.session.query(Admin).filter_by(admin_name=admin_data['admin_name']).first()
		self.assertIsNotNone(result)
		self.assertEqual(result.admin_name, admin_data['admin_name'])
		self.assertEqual(result.user_name, admin_data['user_name'])
		self.assertEqual(result.email, admin_data['email'])
		self.assertEqual(result.password, admin_data['password'])


if __name__ == '__main__':
	unittest.main()
