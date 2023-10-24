#!/usr/bin/env python3
""" init module that start directly when app run
		to connect with mysql database
		contain engine and session of all databases
"""

# import require objects to start sqlalchemy session and engine
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

# import Base object of sqlalchemy from base_model class
from models.base_model import Base

# import all models that represents tables of database before create them
from models.user import User
from models.appointment import Appointment
from models.doctor import Doctor
from models.review import Review
from models.speciality import Speciality
from models.time import Time
from models.offer import Offer
from models.testimonial import Testimonial


# create engine with mysql database, user is api, host is local, and clinic_db database
engine = create_engine('mysql+mysqldb://api@localhost/clinic_db', pool_pre_ping=True)

# create all table by add it to metadata of Base class of sqlalchemy
Base.metadata.create_all(engine)

# create session and initiate it
session_creator = sessionmaker(bind=engine, expire_on_commit=False)
Session = scoped_session(session_creator)
