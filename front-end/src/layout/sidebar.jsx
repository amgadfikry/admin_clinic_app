/* eslint-disable no-unused-vars */
import {
  BiSolidDashboard, FaChartLine, FaUserDoctor, MdSchedule, BsCalendar3, FaKitMedical, BiSolidOffer, MdReviews,
  MdManageAccounts, MdSettings, VscSignOut, IoIosArrowForward, IoIosArrowBack, useState, useCookies, useNavigate,
  SidebarNavLink
} from '../import'

function Sidebar() {
  const [sidebar, setSidebar] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const navigate = useNavigate()

  const handleSidebar = () => {
    setSidebar(!sidebar)
  }

  const handleLogOut = () => {
    removeCookie('token', { path: '/' });
    navigate('/signin')
  };
  return (
    <ul className={`z-2 bg-white drop-shadow-lg w-[200px] py-4 h-[calc(100vh-89px)] top-[56px] border-t text-dark-color font font-medium
    flex flex-col fixed transition-all duration-500 linear ${sidebar && 'w-[50px]'}`}>
      <button onClick={handleSidebar} className='absolute top-1/2 right-0 translate-x-[25px] translate-y-[-50%] bg-white
      w-[25px] h-[50px] rounded-tr-[50%] rounded-br-[50%] py-1 border-t border-r border-b drop-shadow-lg scale '>
        {sidebar
          ? <IoIosArrowForward className='text-2xl text-teal-color font-bold' />
          : <IoIosArrowBack className='text-2xl text-teal-color font-bold' />
        }
      </button>
      <SidebarNavLink icon={BiSolidDashboard} name='Dashboard' route='/' sidebar={sidebar} />
      <SidebarNavLink icon={FaChartLine} name='Analysis' route='/analysis' sidebar={sidebar} />
      <SidebarNavLink icon={FaUserDoctor} name='Doctors' route='/doctors' sidebar={sidebar} />
      <SidebarNavLink icon={MdSchedule} name='Appointments' route='/appointments' sidebar={sidebar} />
      <SidebarNavLink icon={BsCalendar3} name='Calendar' route='/calendar' sidebar={sidebar} />
      <SidebarNavLink icon={FaKitMedical} name='Specialities' route='/specialities' sidebar={sidebar} />
      <SidebarNavLink icon={BiSolidOffer} name='Offers' route='/offers' sidebar={sidebar} />
      <SidebarNavLink icon={MdReviews} name='Testimonials' route='/testimonials' sidebar={sidebar} />
      <SidebarNavLink icon={MdManageAccounts} name='Roles' route='/roles' sidebar={sidebar} />
      <SidebarNavLink icon={MdSettings} name='Settings' route='/settings' sidebar={sidebar} />
      <hr className={`border-gray-300 w-[80%] mx-auto transition-all duration-500 mb-2 mt-auto ${sidebar && 'w-0 opacity-0'}`} />
      <li className='sidebar-li group' onClick={handleLogOut}>
        <VscSignOut className='sidebar-icon' />
        <p className={`sidebar-text ${sidebar && 'scale-x-0 opacity-0'}`}>Logout</p>
      </li>
    </ul>
  )
}

export default Sidebar