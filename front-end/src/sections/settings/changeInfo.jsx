/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  useState, useSelector, adminDataState, TextInput, SubmitBtn, baseUrl, useCookies, setAdminData, useDispatch,
  BiSolidCloudUpload
} from '../../import.js'

function ChangeInfo() {
  const [cookies] = useCookies(['token'])
  const adminData = useSelector(adminDataState)
  const dispatch = useDispatch()
  const [changeProfile, setChangeProfile] = useState({ ...adminData })
  const [successChanges, setSuccessChanges] = useState(false)
  const [errorMsg, setErrorMsg] = useState({ 'admin_name': '', 'email': '', 'user_name': '', 'all': '' })

  const handleChangeProfile = (e) => {
    setChangeProfile({ ...changeProfile, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    e.preventDefault()
    setChangeProfile({ ...adminData })
    setErrorMsg({ 'admin_name': '', 'email': '', 'user_name': '', 'all': '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg((prevErrorMsg) => ({
      'admin_name': '', 'email': '', 'user_name': '', 'all': ''
    }));
    let allFilled = true
    let same = 0
    for (let key in changeProfile) {
      if (changeProfile[key] === '') {
        allFilled = false
        setErrorMsg((prevErrorMsg) => ({
          ...prevErrorMsg,
          [key]: 'This field is required',
          all: 'Fill in all required',
        }));
      }
      if (changeProfile[key] === adminData[key]) {
        same++
      }
    }
    if (!allFilled) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        'all': 'Fill in all required',
      }));
      return
    }
    if (same === Object.keys(changeProfile).length) {
      setErrorMsg({ 'admin_name': '', 'email': '', 'user_name': '', 'all': '' })
      return
    }
    fetch(`${baseUrl}/api/admin/update`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changeProfile),
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        if ('msg' in data) {
          setErrorMsg((prevErrorMsg) => ({
            'admin_name': '', 'email': '', 'user_name': '', 'all': ''
          }));
        } else {
          setErrorMsg((prevErrorMsg) => ({
            'admin_name': '', 'email': '', 'user_name': '', 'all': ''
          }));
          dispatch(setAdminData(data))
          setChangeProfile({ ...data })
          setSuccessChanges(true)
          setTimeout(() => {
            setSuccessChanges(false)
          }, 3000)
        }
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className='filedset'>
        <legend className='legend'>Personal info</legend>
        <TextInput type='text' label='Full Name' placeholder='Enter your full name' id='admin_name' value={changeProfile.admin_name}
          changeFunc={handleChangeProfile} error={errorMsg.admin_name} className='' />
        <TextInput type='text' label='User Name' placeholder='Enter your user name' id='user_name' value={changeProfile.user_name}
          changeFunc={handleChangeProfile} error={errorMsg.user_name} />
        <TextInput type='text' label='Email' placeholder='Enter your email address' id='email' value={changeProfile.email}
          changeFunc={handleChangeProfile} error={errorMsg.email} />
        <div className='w-full shrink-0 py-4 px-3 text-center border rounded-lg border-gray-300 bg-white'>
          <input type='file' name='image' id='image' className='hidden' disabled />
          <label htmlFor='image' className='flex justify-center items-center border w-fit mx-auto py-2 px-4
          bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200'>
            <BiSolidCloudUpload className='text-2xl text-teal-color mr-3' />
            <p>Choose a profile picture</p>
          </label>
        </div>
        <div className='w-full flex justify-end items-start pr-2 pt-5 relative '>
          {successChanges && <p className='text-green-500 text-sm absolute left-0 bottom-[-10%] '>Changes saved successfully</p>}
          <input type="submit" value='Cancel' onClick={handleCancel}
            className='border border-teal-color rounded-3xl px-4 py-1 text-teal-color font-medium cursor-pointer ml-auto
            hover:bg-dark-color hover:border-dark-color hover:text-white transition-all duration-300 mr-2'></input>
          <SubmitBtn value='Save Changes' error={errorMsg.all} />
        </div>
      </fieldset>
    </form>
  )
}

export default ChangeInfo
/*


*/