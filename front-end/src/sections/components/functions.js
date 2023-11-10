/* eslint-disable no-unused-vars */
export const handleDeleteItem = (options) => {
  const { baseUrl, apiUrl, id, cookies, dataState, setDataState, setConfirmDelete, navigate, setServerError } = options
  fetch(`${baseUrl}/api/admin/${apiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
    },
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      const filterList = dataState.filter(el => el.id !== id)
      setConfirmDelete("")
      setDataState(filterList)
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}


export const handleCreate = (options) => {
  const { baseUrl, url, cookies, newSpeciality, setNewSpeciality, setErrorMsg, setSuccessChanges, navigate, setServerError, checkDataError } = options
  setErrorMsg({});
  const errors = checkDataError(newSpeciality, [])
  if (Object.keys(errors).length > 0) {
    setErrorMsg({ ...errors })
    return;
  }
  fetch(`${baseUrl}/api/admin/${url}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newSpeciality),
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      if ('error' in data) {
        setErrorMsg({ ...data.error })
      } else {
        setSuccessChanges(true)
        setErrorMsg({});
        setNewSpeciality({ 'name': '', 'price': '' })
        setTimeout(() => {
          setSuccessChanges(false)
        }, 2000)
      }
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}

export const handleGet = (options) => {
  const { baseUrl, apiUrl, cookies, dataState, setLoading, setServerError, navigate } = options
  fetch(`${baseUrl}/api/admin/${apiUrl}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
    },
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      dataState(data)
      setLoading(false)
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}

export const handleUpdate = (options) => {
  const { baseUrl, apiUrl, cookies, changeSpeciality, setChangeSpeciality, setErrorMsg, specialityData, navigate, setServerError,
    checkDataError, samilarData } = options
  setErrorMsg({});
  const errors = checkDataError(changeSpeciality, [])
  if (Object.keys(errors).length > 0) {
    setErrorMsg({ ...errors })
    return;
  }
  const errorSame = samilarData(changeSpeciality, specialityData)
  if (Object.keys(errorSame).length > 0) {
    setErrorMsg({ ...errorSame })
    return;
  }
  fetch(`${baseUrl}/api/admin/${apiUrl}/${specialityData.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(changeSpeciality),
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      setErrorMsg({});
      setChangeSpeciality({ ...data })
      navigate('/dashboard/specialities')
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}