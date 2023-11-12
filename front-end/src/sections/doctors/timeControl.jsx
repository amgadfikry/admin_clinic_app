/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  useState, useCookies, baseUrl, SubmitBtn, useNavigate, useEffect, CreateTime, Select
} from '../../import'

function TimeControl(doctorData) {
  const [selectedOption, setSelectedOption] = useState("");
  const [timeData, setTimeData] = useState([])
  const [toggleMenu, setToggleMenu] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [error, setError] = useState([])
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
    console.log(selectedOption);
  };

  const handleCancel = (e) => {
    e.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/dashboard/doctors`)
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/time`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        data.forEach(el => {
          setTimeData([...timeData, { value: el.id, label: `${el.day} (${el.start})` }])
        })
      })
      .catch((error) => {
        setServerError(true)
        navigate('/server504error')
      });
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className='filedset'>
          <legend className='legend'>Time control</legend>
          <div className='flex-col flex flex-1'>
            <div className='flex flex-col md:flex-row flex-1 md:items-center mb-8'>
              <div className='flex flex-col space-y-2 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow md:mr-3'>
                <label htmlFor='time' className='text-sm pl-1 text-bold'>Time</label>
                <Select className='w-full' options={timeData} isMulti onChange={handleChange} />
                <button type='button' className='bg-teal-color text-white rounded-lg px-3 py-2' onClick={handleToggleMenu}>Add new time</button>
              </div>
              <div className={`bg-white rounded-lg min-h-[100px] md:min-h-[100%] w-full border md:w-1/2 border-gray-300 p-2 flex
              justify-center items-center mt-4 md:mt-0`}>
                <span className='text-gray-300 text-lg font-bold text-center'>No time selected</span>
              </div>
            </div>
          </div>
          <SubmitBtn value='Update' error='' cancel={handleCancel} success={false}
            successMsg='' />
        </fieldset>
      </form>
      {toggleMenu && <CreateTime setTimeData={setTimeData} timeData={timeData} setToggleMenu={setToggleMenu} />}
    </>
  )
}

export default TimeControl