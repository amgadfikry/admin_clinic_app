/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useState, useCookies, baseUrl, checkDataError, SubmitBtn
} from '../../import'
import Select from "react-select";

function CreateTime({ setTimeData, timeData, setToggleMenu }) {
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [serverError, setServerError] = useState(false)
  const [successChanges, setSuccessChanges] = useState(false)
  const [error, setError] = useState({})
  const [cookies] = useCookies(['token'])

  const weekDays = [
    { value: 'Saturday', label: 'Saturday' }, { value: 'Sunday', label: 'Sunday' }, { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' }, { value: 'Wednesday', label: 'Wednesday' }, { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' }
  ]
  const hours = []
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      hours.push({ value: `0${i}:00`, label: `0${i}:00`, num: i })
    } else {
      hours.push({ value: `${i}:00`, label: `${i}:00`, num: i })
    }
  }

  const handleChangeWeek = (selectedWeek) => {
    setSelectedWeek(selectedWeek.value);
  };
  const handleChangeStart = (selectedOption) => {
    setSelectedStart(selectedOption.value);
  };
  const handleChangeEnd = (selectedEnd) => {
    setSelectedEnd(selectedEnd.value);
  };

  const handleCancel = (e) => {
    setToggleMenu(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const time = { day: selectedWeek, start: selectedStart, end: selectedEnd }
    const errors = checkDataError(time, [])
    if (Object.keys(errors).length > 0) {
      setError({ ...errors })
      return;
    }
    fetch(`${baseUrl}/api/admin/time`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(time)
    }).then(response => response.json())
      .then(data => {
        setSuccessChanges(true)
        setTimeData([...timeData, data])
        setSelectedWeek('')
        setSelectedStart('')
        setSelectedEnd('')
        setError({})
        setTimeout(() => {
          setSuccessChanges(false)
          setToggleMenu(false)
        }, 2000)
      })
      .catch((error) => {
        setServerError(true)
      });
  }

  return (
    <form onSubmit={handleSubmit} className=''>
      <fieldset className='filedset'>
        <legend className='legend'>Add new time</legend>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 flex-1 flex-wrap'>
          <div className=' flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0 md:mr-3'>
            <label htmlFor='start' className='text-sm pl-1 text-bold'>Start</label>
            <Select options={hours} onChange={handleChangeStart} value={selectedStart.value} />
            <span className='text-xs text-red-500 pl-1 h-2'>{error.start}</span>
          </div>
          <div className=' flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0 md:mr-3'>
            <label htmlFor='end' className='text-sm pl-1 text-bold'>End</label>
            <Select options={hours} name='end' id='end' onChange={handleChangeEnd} value={selectedEnd.value} />
            <span className='text-xs text-red-500 pl-1 h-2'>{error.end}</span>
          </div>
          <div className=' flex flex-col space-y-1 w-full shrink-0 md:w-[calc(50%-12px)] flex-grow lg:flex-grow-0 md:mr-3'>
            <label htmlFor='day' className='text-sm pl-1 text-bold'>Day</label>
            <Select options={weekDays} name='day' id='day' onChange={handleChangeWeek} value={selectedWeek.value} />
            <span className='text-xs text-red-500 pl-1 h-2'>{error.day}</span>
          </div>
        </div>
        <SubmitBtn value='Add' cancel={handleCancel} successMsg='Added successfully' error={error.all} success={successChanges} />
      </fieldset>
    </form>
  )
}

export default CreateTime