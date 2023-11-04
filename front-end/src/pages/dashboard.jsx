/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Navbar, Sidebar, Footer, ServerError, LoadingComponent, ComingSoon, Doctors, setAdminData,
  setDoctorsData, setTestimonialsData, setAppointmentsData, useDispatch, useCookies, useEffect,
  useState, Routes, Route, baseUrl
} from '../import'

function Dashboard() {
  const [cookies, setCookie] = useCookies(['token'])
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  const fetchLibrary = [
    { 'url': '/api/admin/state', 'action': setAdminData },
    { 'url': '/api/admin/doctor', 'action': setDoctorsData },
    { 'url': '/api/admin/testimonial', 'action': setTestimonialsData },
    { 'url': '/api/admin/appointment', 'action': setAppointmentsData },
  ]

  useEffect(() => {
    fetchLibrary.forEach((item) => {
      fetch(baseUrl + item.url, {
        headers: {
          'Authorization': 'Bearer ' + cookies.token,
        },
        method: 'GET',
        mode: 'cors',
      }).then(response => response.json())
        .then(data => {
          dispatch(item.action(data))
        })
        .catch((error) => {
          setServerError(true)
        });
    })
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  if (serverError) {
    return <ServerError />
  } else if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div className="flex flex-col h-[100vh]">
        <Navbar className='flex-1' />
        <Sidebar />
        <div className='pt-[56px] pl-[50px]  relative z-[-1]'>
          <Routes>
            <Route exact path='/' element={<div>amgad</div>} ></Route>
            <Route exact path="analysis" element={<ComingSoon />} />
            <Route exact path='doctors' element={<Doctors />} ></Route>
            <Route exact path='appointments' element={<ComingSoon />} ></Route>
            <Route exact path='calendar' element={<ComingSoon />} ></Route>
            <Route exact path='specialities' element={<ComingSoon />} ></Route>
            <Route exact path='offers' element={<ComingSoon />} ></Route>
            <Route exact path='testimonials' element={<ComingSoon />} ></Route>
            <Route exact path='roles' element={<ComingSoon />} ></Route>
            <Route exact path='settings' element={<ComingSoon />} ></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Dashboard