#!/usr/bin/env python3
""" init module that start directly when app run
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


engine = create_engine('mysql+mysqldb://api@localhost/clinic_db', pool_pre_ping=True)
Base.metadata.create_all(engine)
session_creator = sessionmaker(bind=engine, expire_on_commit=False)
Session = scoped_session(session_creator)
