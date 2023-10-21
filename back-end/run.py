#!/usr/bin/env python3

from models import Session
from models.users import User

data = {'full_name': 'asmaa hamdy', 'email': 'asmaa_hamdy@yahoo.com',
									'password': '675757'}
new_user = User(**data)
Session.add(new_user)
Session.commit()