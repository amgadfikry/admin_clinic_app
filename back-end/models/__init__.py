#!/usr/bin/env python3
""" init module that start directly when app run
		contain engine and session of all databases
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()
engine = create_engine('mysql+mysqldb//api@localhost/clinic_db')