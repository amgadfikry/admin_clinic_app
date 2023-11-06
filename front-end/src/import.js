// react components and pages
import Navbar from './layout/navbar';
import Sidebar from './layout/sidebar';
import Footer from './layout/footer';
import ServerError from './pages/serverError';
import LoadingComponent from './components/loading';
import ComingSoon from './pages/comingSoon';
import Doctors from './sections/doctors/doctors';
import SidebarNavLink from './layout/sidebarNavLink';
import Signin from "./pages/signin"
import Dashboard from "./pages/dashboard"
import NotFound from "./pages/notFound";
import AuthChecker from "./components/authChecker";
import Settings from './sections/settings/settings';
import TextInput from './components/textInput';
import SubmitBtn from './components/submitBtn';
import ChangeInfo from './sections/settings/changeInfo';
import ChangePassword from './sections/settings/changePassword';
import Specialities from './sections/specialities/specialities';
import CreateSpeciality from './sections/specialities/createSpeciality';
import ContentSpeciality from './sections/specialities/contentSpeciality';
import EditSpeciality from './sections/specialities/editSpeciality';
// redux
import { setAdminData, adminDataState } from './redux/profile';
import { setDoctorsData, doctorsDataState } from './redux/doctors';
import { setTestimonialsData, testimonialDataState } from './redux/testimonial';
import { setAppointmentsData, appointmentsDataState } from './redux/appointment';
import { setspecialitiesData, specialitiesDataState } from './redux/specialities';
import { useDispatch, useSelector } from 'react-redux';
// react-router-dom
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink, Link } from 'react-router-dom';
// react-cookie
import { useCookies, CookiesProvider } from 'react-cookie';
// constant
import { baseUrl } from '../constant'
// react hooks
import { useEffect, useState } from 'react'
//icons
import { MdOutlineCopyright, MdDarkMode, MdLightMode, MdSchedule, MdReviews, MdManageAccounts, MdSettings } from 'react-icons/md'
import { FaXTwitter, FaGithub, FaLinkedinIn, FaUserDoctor, FaKitMedical, FaChartLine } from 'react-icons/fa6'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { IoMdNotifications, IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { BiSolidDashboard, BiSolidOffer, BiSolidCloudUpload } from 'react-icons/bi'
import { BsCalendar3, BsFillPersonFill } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'

export {
  // react components and pages
  Navbar, Sidebar, Footer, ServerError, LoadingComponent, ComingSoon, Doctors, SidebarNavLink, Signin, Dashboard, NotFound, AuthChecker,
  Settings, TextInput, SubmitBtn, ChangeInfo, ChangePassword, Specialities, CreateSpeciality, ContentSpeciality, EditSpeciality,
  // redux
  setAdminData, setDoctorsData, setTestimonialsData, setAppointmentsData, adminDataState, useSelector, useDispatch,
  testimonialDataState, appointmentsDataState, doctorsDataState, setspecialitiesData, specialitiesDataState,
  // cookies
  useCookies, CookiesProvider,
  // react-hooks
  useEffect, useState,
  // react-router-dom
  Router, Routes, Route, useNavigate, NavLink, Link,
  // constant
  baseUrl,
  // icons
  MdOutlineCopyright, FaXTwitter, FaGithub, FaLinkedinIn, IoMdNotifications, CgProfile, MdDarkMode, MdLightMode,
  MdSchedule, MdReviews, MdManageAccounts, MdSettings, FaUserDoctor, FaKitMedical, FaChartLine, IoIosArrowForward,
  IoIosArrowBack, BiSolidDashboard, BiSolidOffer, BsCalendar3, VscSignOut, FaUserAlt, FaLock, BsFillPersonFill,
  BiSolidCloudUpload
}

