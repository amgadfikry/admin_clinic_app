import process from 'process'

export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.1.3:5000' : 'http://localhost:5000'

const searchPattern = (pattern, string) => {
  return (pattern.test(string))
}

/*export const convertDataToNumber = (data) => {
  const numberItems = ['stars', 'price', 'start', 'end', 'old_price', 'new_price']
  for (let [key , value] of Object.entries(data)) {
    if (numberItems.includes(key) && value) {
      data[key] = parseInt(value)
    }
  }
}*/

export const samilarData = (newData, oldData) => {
  const errorDic = {}
  for (const key in newData) {
    if (newData[key] !== oldData[key]) {
      return errorDic
    }
  }
  errorDic['all'] = 'Same data without changes'
  return errorDic
}

export const checkDataError = (data, exception) => {
  const userPattern = /^[^!\s\W]{5,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const numberItems = ['stars', 'price', 'start', 'end', 'old_price', 'new_price']
  const errorDic = {}
  for (let [key, value] of Object.entries(data)) {
    if (!value && !exception.includes(key)) {
      errorDic[key] = 'Fill required field';
      continue;
    }
    if (['full_name', 'admin_name'].includes(key) && (value.length < 8 || value.length > 20)) {
      errorDic[key] = 'Name between 8 and 20 characters'
      continue;
    }
    if (key === 'user_name' && !searchPattern(userPattern, value)) {
      errorDic[key] = 'User name at least 5 characters and no space or special characters';
      continue;
    }
    if (key === 'email' && !searchPattern(emailPattern, value)) {
      errorDic[key] = "Invalid email address";
      continue;
    }
    if (numberItems.includes(key) && value) {
      data[key] = parseInt(value)
      if (value < 0) {
        errorDic[key] = "Can't be negative number";
      }
      continue;
    }
  }
  if (Object.keys(errorDic).length > 0) {
    errorDic['all'] = 'Check input requirements';
  }
  return (errorDic)
}


export const checkPassword = (data) => {
  const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:<>?~]).{8,}$/;
  const errorDic = {}
  for (let [key, value] of Object.entries(data)) {
    if (!value) {
      errorDic[key] = 'Fill required field';
      continue;
    }
    if (['new_password', 'confirm_password'].includes(key) && !searchPattern(passwordPattern, value)) {
      errorDic[key] = 'Password contain at least (one special character, number, capital letter)\
												and at least 8 characters'
      continue;
    }
    if (key === 'confirm_password' && value != data['new_password']) {
      errorDic[key] = 'Not match password'
      continue;
    }
  }
  if (Object.keys(errorDic).length > 0) {
    errorDic['all'] = 'Check input requirements';
  }
  return (errorDic)
}