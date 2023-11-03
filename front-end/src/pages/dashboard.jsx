/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Navbar from '../layout/navbar'
import { useCookies } from 'react-cookie';
import { baseUrl } from '../../constant'
import Sidebar from '../layout/sidebar';
import Footer from '../layout/footer';

function Dashboard() {
  const [adminData, setAdminData] = useState({})
  const [cookies, setCookie] = useCookies(['token'])

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/state`, {
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      method: 'GET',
      mode: 'cors',
    }).then(response => response.json())
      .then(data => {
        setAdminData(data)
      })
  })

  return (
    <div className="flex flex-col h-[100vh]">
      <Navbar adminData={adminData} className='flex-1' />
      <Sidebar />
      <div className='pt-[56px] pl-[50px] relative z-[-1]'>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard