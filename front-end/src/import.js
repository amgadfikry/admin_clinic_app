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
import ConfirmMsg from './components/confirmMsg';
import CreateOffer from './sections/offers/createOffer';
import EditOffer from './sections/offers/editOffer';
import Offers from './sections/offers/offers';
import ContentOffer from './sections/offers/contentOffer';
import Selectspeciality from './components/selectSpecialitySelect';
import CreateDoctor from './sections/doctors/createDoctor';
import EditDoctor from './sections/doctors/editDoctor';
import ContentDoctor from './sections/doctors/contentDoctor';
import Stars from './components/stars';
import CreateTime from './sections/doctors/createTime';
import Details from './components/details';
import ImageSelect from './components/imageSelect';
// redux
import { setAdminData, adminDataState } from './redux/profile';
import { useDispatch, useSelector } from 'react-redux';
// react-router-dom
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink, Link, useLocation } from 'react-router-dom';
// react-cookie
import { useCookies, CookiesProvider } from 'react-cookie';
// constant
import { baseUrl, checkDataError, samilarData, checkPassword } from '../constant'
// react hooks
import { useEffect, useState, useRef } from 'react'
//icons
import {
  MdOutlineCopyright, MdDarkMode, MdLightMode, MdSchedule, MdReviews, MdManageAccounts, MdSettings,
  MdEmail
} from 'react-icons/md'
import { FaXTwitter, FaGithub, FaLinkedinIn, FaUserDoctor, FaKitMedical, FaChartLine } from 'react-icons/fa6'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { IoMdNotifications, IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { BiSolidDashboard, BiSolidOffer, BiSolidCloudUpload } from 'react-icons/bi'
import { BsCalendar3, BsFillPersonFill, BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { VscSignOut } from 'react-icons/vsc'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { PiStethoscopeBold } from 'react-icons/pi'

export {
  // react components and pages
  Navbar, Sidebar, Footer, ServerError, LoadingComponent, ComingSoon, Doctors, SidebarNavLink, Signin, Dashboard, NotFound, AuthChecker,
  Settings, TextInput, SubmitBtn, ChangeInfo, ChangePassword, Specialities, CreateSpeciality, ContentSpeciality, EditSpeciality,
  ConfirmMsg, CreateOffer, EditOffer, Offers, ContentOffer, Selectspeciality, CreateDoctor, EditDoctor, ContentDoctor, Stars,
  CreateTime, Details, ImageSelect,
  // redux
  setAdminData, adminDataState, useSelector, useDispatch,
  // cookies
  useCookies, CookiesProvider,
  // react-hooks
  useEffect, useState, useRef,
  // react-router-dom
  Router, Routes, Route, useNavigate, NavLink, Link, useLocation,
  // constant
  baseUrl, checkDataError, samilarData, checkPassword,
  // icons
  MdOutlineCopyright, FaXTwitter, FaGithub, FaLinkedinIn, IoMdNotifications, CgProfile, MdDarkMode, MdLightMode,
  MdSchedule, MdReviews, MdManageAccounts, MdSettings, FaUserDoctor, FaKitMedical, FaChartLine, IoIosArrowForward,
  IoIosArrowBack, BiSolidDashboard, BiSolidOffer, BsCalendar3, VscSignOut, FaUserAlt, FaLock, BsFillPersonFill,
  BiSolidCloudUpload, AiOutlineDelete, AiOutlineEdit, PiStethoscopeBold, MdEmail, BsStarFill, BsStarHalf, BsStar
}

