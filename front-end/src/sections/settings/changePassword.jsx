/* eslint-disable no-unused-vars */
import {
  useState, TextInput, SubmitBtn, baseUrl, useCookies, useNavigate
} from '../../import.js'

function ChangePassword() {
  const [errorMsg, setErrorMsg] = useState({ 'current_password': '', 'new_password': '', 'confirm_password': '', 'all': '' })
  const [changePassword, setChangePassword] = useState({ 'current_password': '', 'new_password': '', 'confirm_password': '' })
  const [successChanges, setSuccessChanges] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const navigate = useNavigate()

  const handleChangePassword = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setChangePassword({ 'current_password': '', 'new_password': '', 'confirm_password': '' })
    setErrorMsg({ 'current_password': '', 'new_password': '', 'confirm_password': '', 'all': '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg((prevErrorMsg) => ({
      'current_password': '', 'new_password': '', 'confirm_password': '', 'all': ''
    }));
    let allFilled = true
    for (let key in changePassword) {
      if (changePassword[key] === '') {
        allFilled = false
        setErrorMsg((prevErrorMsg) => ({
          ...prevErrorMsg,
          [key]: 'This field is required'
        }));
      }
    }
    if (!allFilled) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        'all': 'Fill in all required',
      }));
      return
    }
    if (changePassword.new_password !== changePassword.confirm_password) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        'confirm_password': 'Password does not match',
      }));
      return
    }
    fetch(`${baseUrl}/api/admin/password`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changePassword),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('msg' in data) {
          setErrorMsg((prevErrorMsg) => ({
            'current_password': data.msg, 'new_password': '', 'confirm_password': '', 'all': ''
          }));
        } else {
          setErrorMsg({ 'current_password': '', 'new_password': '', 'confirm_password': '', 'all': '' })
          setChangePassword({ 'current_password': '', 'new_password': '', 'confirm_password': '' })
          setSuccessChanges(true)
          setTimeout(() => {
            removeCookie('token', { path: '/' });
            navigate('/signin')
          }, 4000)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='filedset pb-12 sm:pb-5 md:pb-0' >
        <legend className='legend'>Change Password</legend>
        <TextInput type='password' label='Current Password' placeholder='Enter your current password' id='current_password'
          value={changePassword.current_password} changeFunc={handleChangePassword} error={errorMsg.current_password} />
        <TextInput type='password' label='New Password' placeholder='Enter your new password' id='new_password'
          value={changePassword.new_password} changeFunc={handleChangePassword} error={errorMsg.new_password} />
        <TextInput type='password' label='Confirm Password' placeholder='confirm new password' id='confirm_password'
          value={changePassword.confirm_password} changeFunc={handleChangePassword} error={errorMsg.confirm_password} />
        <div className='w-full flex justify-end items-start pr-2 pt-5 relative '>
          {successChanges && <p className='text-green-500 text-sm absolute left-0 bottom-[-40%] sm:bottom-[-10%] md:bottom-[10%]'>
            Changes password successfully and sign out now.</p>}
          <input type="submit" value='Cancel' onClick={handleCancel}
            className='border border-teal-color rounded-3xl px-4 py-1 text-teal-color font-medium cursor-pointer ml-auto
            hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2'></input>
          <SubmitBtn value='Confirm changes' error={errorMsg.all} />
        </div>
      </fieldset>
    </form>
  )
}

export default ChangePassword