// react components and pages
import Navbar from './layout/navbar';
import Sidebar from './layout/sidebar';
import Footer from './layout/footer';
import ServerError from './pages/serverError';
import LoadingComponent from './components/loading';
import ComingSoon from './pages/comingSoon';
import Doctors from './sections/doctors';
import SidebarNavLink from './components/sidebarNavLink'
import Signin from "./pages/signin"
import Dashboard from "./pages/dashboard"
import NotFound from "./pages/notFound";
import AuthChecker from "./components/authChecker";
// redux
import { setAdminData, adminDataState } from './redux/profile';
import { setDoctorsData } from './redux/doctors';
import { setTestimonialsData } from './redux/testimonial';
import { setAppointmentsData } from './redux/appointment';
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
import { BiSolidDashboard, BiSolidOffer } from 'react-icons/bi'
import { BsCalendar3 } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'

export {
  // react components and pages
  Navbar, Sidebar, Footer, ServerError, LoadingComponent, ComingSoon, Doctors, SidebarNavLink, Signin, Dashboard, NotFound, AuthChecker,
  // redux
  setAdminData, setDoctorsData, setTestimonialsData, setAppointmentsData, adminDataState, useSelector, useDispatch,
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
  IoIosArrowBack, BiSolidDashboard, BiSolidOffer, BsCalendar3, VscSignOut, FaUserAlt, FaLock
}

