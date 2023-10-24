#!/usr/bin/env python3

from models import Session
from models.user import User
from models.appointment import Appointment
from models.doctor import Doctor
from models.review import Review
from models.speciality import Speciality
from models.time import Time
from models.offer import Offer
from datetime import datetime

user1 = {'full_name': 'moaz', 'email': 'moaz_amgad@yahoo.com',
						'password': '343432'}
user2 = {'full_name': 'kadija', 'email': 'khadija_amgad@yahoo.com',
						'password': '6575675'}
speciality1 = {'name': "physiotherapist", 'price': 100}
speciality2 = {'name': "nutrition", 'price': 200}
doctor1 ={'full_name': 'asmaa hamdy', 'speciality_id': '89f8d514-7790-4487-8ffa-4da175c2fdc9', 'title': 'Doctor',
					'details': 'cairo university'}
doctor2 ={'full_name': 'amgad fikry', 'speciality_id': 'b35a3d4d-73ea-4d0a-b0a9-4339b7d5dcc0', 'title': 'Doctor',
					'details': 'cairo university'}
review1 = {'user_id': '19282dae-0912-42aa-ad21-5a7e584f22ec', 'doctor_id':'21a38994-6238-4957-9283-e2f1c6d9c209',
 'text':'good from moaz', 'stars':3}
review2 = {'user_id': '19282dae-0912-42aa-ad21-5a7e584f22ec', 'doctor_id':'3174844f-82da-489e-96f0-6d8e5e6d784b',
 'text':'good from moaz', 'stars':3}
review3 = {'user_id': '05c89a1f-00dc-4211-bdfc-ca691981628f', 'doctor_id':'21a38994-6238-4957-9283-e2f1c6d9c209',
 'text':'exclellent from kadija', 'stars':5}
review4 = {'user_id': '05c89a1f-00dc-4211-bdfc-ca691981628f', 'doctor_id':'3174844f-82da-489e-96f0-6d8e5e6d784b',
 'text':'exclellent from kadija', 'stars':5}
appo1 ={'user_id': '19282dae-0912-42aa-ad21-5a7e584f22ec', 'doctor_id':'21a38994-6238-4957-9283-e2f1c6d9c209',
 'date': 'friday'}
appo2 ={'user_id': '05c89a1f-00dc-4211-bdfc-ca691981628f', 'doctor_id':'3174844f-82da-489e-96f0-6d8e5e6d784b',
 'date': 'sunday'}
time2 = {'day':'friday', 'start':12, 'end':14}
time1 = {'day':'sunday', 'start':17, 'end':20}
offer = {'title':'weight loss', 'old_price': 100, 'new_price': 70, 'description': 'pla pla pla',
'speciality_id': 'b35a3d4d-73ea-4d0a-b0a9-4339b7d5dcc0', 'expire_date': datetime(2023, 12, 15, 0 , 0 , 0), }

new = Offer(**offer)
Session.add(new)
Session.commit()
result = Session.query(Offer).first()
print(result.to_dict())