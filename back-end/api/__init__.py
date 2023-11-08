""" module hold functions neccssary for all api project """
from re import search
from werkzeug.security import check_password_hash



def check_data_types(data):
	""" check if type of data incorrect and 
			convert it
			params:
				- data dictionary
			return:
				data dictionary corrected
	"""
	correct_data = {}
	for key, value in data.items():
		if key in ['stars', 'price', 'start', 'end', 'old_price', 'new_price'] and value:
			correct_data[key] = int(value)
		else:
			correct_data[key] = value
	return correct_data


def search_pattern(pattern, string):
	""" check if string contain special pattern
			params:
				- pattern of regular expression
				- string search in it
			return:
				- true if find it 
				- false if not find it
	"""
	return bool(search(pattern, string))


def check_data_error(data, exception):
	""" check if any value of dictionary of data is empty
			and specific requirement for some key value
			except in the exception list
			Params:
				- data: dictionary of data to look in it
				- exception: list contain exception keys in data
			Return:
				- dictionary of errors
				- or empty dictionary
	"""
	pattern_user = r'^[^!\s\W]{5,}$'
	pattern_email = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
	pattern_password = r'^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:<>?~]).{8,}$'
	error_dic = {}
	for key, value in data.items():
		if  not value and key not in exception:
			error_dic[key] = 'Fill required field'
			pass
		if key in ['full_name', 'admin_name'] and (len(value) < 8 or len(value) > 20):
			error_dic[key] = 'Name between 8 and 20 characters'
			pass
		if key in ['user_name'] and not search_pattern(pattern_user, value):
			error_dic[key] = 'User name at least 5 characters and no space or special characters'
			pass
		if key in ['email'] and not search_pattern(pattern_email, value):
			error_dic[key] = "Invalid email address"
			pass
		if key in ['password'] and not search_pattern(pattern_password, value):
			error_dic[key] = 'Password contain at least (one special character, number, capital letter)\
												and at least 8 characters'
			pass
		if key in ['stars', 'price', 'start', 'end', 'old_price', 'new_price'] and int(value) < 0:
			error_dic[key] = "Can't be negative number"
			pass
	if error_dic:
		error_dic['all'] = 'Check input requirements'
	return error_dic


def check_change_password(data, password):
	""" check password for changes
			params:
				- dictoary of password new and old
			return:
				- error dictionary if there is error
				- empty dictionary if no error
	"""
	error_dic = {}
	if not check_password_hash(password, data.get('current_password')):
		error_dic['current_password'] = 'Incorrect Password'
	if check_password_hash(password, data.get('new_password')):
		error_dic['new_password'] = 'The same old password'
	if error_dic:
		error_dic['all'] = 'Check input requirements'
	return error_dic
