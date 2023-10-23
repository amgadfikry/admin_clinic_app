#!/usr/bin/env python3

from models import Session
from models.user import User
from models.appointment import Appointment
from models.doctor import Doctor
from models.review import Review
from models.speciality import Speciality
from models.time import Time

data_user = {'full_name': 'khadija', 'email': 'khadija_amgad@yahoo.com',
									'password': '998312'}
data_specialiy = {}
new_user = User(**data_user)
Session.add(new_user)
Session.commit()