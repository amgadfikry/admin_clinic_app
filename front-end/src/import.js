// react components, sections, layouts and pages
// pages
import Signin from "./pages/signin"
import Dashboard from "./pages/dashboard"
import NotFound from "./pages/notFound";
import ServerError from './pages/serverError';
import ComingSoon from './pages/comingSoon';
// layouts
import Navbar from './layout/navbar';
import Sidebar from './layout/sidebar';
import Footer from './layout/footer';
import SidebarNavLink from './layout/sidebarNavLink';
// app components
import LoadingComponent from './components/loading';
import AuthChecker from "./components/authChecker";
// sections components
import TextInput from './sections/components/textInput';
import SubmitBtn from './sections/components/submitBtn';
import ConfirmMsg from './sections/components/confirmMsg';
import Stars from './sections/components/stars';
import Details from './sections/components/details';
import ImageSelect from './sections/components/imageSelect';
import Selectspeciality from './sections/components/selectSpecialitySelect';
import Header from './sections/components/header';
import SubHeader from './sections/components/subHeader';
import TableHead from './sections/components/tableHead';
import Textarea from './sections/components/textarea';
// settings section
import Settings from './sections/settings/settings';
import ChangeInfo from './sections/settings/changeInfo';
import ChangePassword from './sections/settings/changePassword';
// doctors section
import Doctors from './sections/doctors/doctors';
import CreateDoctor from './sections/doctors/createDoctor';
import EditDoctor from './sections/doctors/editDoctor';
import ContentDoctor from './sections/doctors/contentDoctor';
import CreateTime from './sections/doctors/createTime';
import PreviewDoctor from './sections/doctors/previewDoctor';
// offers section
import Offers from './sections/offers/offers';
import CreateOffer from './sections/offers/createOffer';
import EditOffer from './sections/offers/editOffer';
import ContentOffer from './sections/offers/contentOffer';
import PreviewOffer from './sections/offers/previewOffer';
// specialities section
import Specialities from './sections/specialities/specialities';
import CreateSpeciality from './sections/specialities/createSpeciality';
import ContentSpeciality from './sections/specialities/contentSpeciality';
import EditSpeciality from './sections/specialities/editSpeciality';

// redux reducers and hooks
import { setAdminData, adminDataState } from './redux/profile';
import { useDispatch, useSelector } from 'react-redux';

// react-router-dom hooks
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink, Link, useLocation } from 'react-router-dom';

// react-cookie hook
import { useCookies, CookiesProvider } from 'react-cookie';

// constant through all app
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

// images
import headerPhoto from './assets/header.jpg'

// functions
import { handleDeleteItem, handleCreate, handleGet, handleUpdate } from './sections/components/functions'

export {
  // react components and pages
  Navbar, Sidebar, Footer, ServerError, LoadingComponent, ComingSoon, Doctors, SidebarNavLink, Signin, Dashboard, NotFound, AuthChecker,
  Settings, TextInput, SubmitBtn, ChangeInfo, ChangePassword, Specialities, CreateSpeciality, ContentSpeciality, EditSpeciality,
  ConfirmMsg, CreateOffer, EditOffer, Offers, ContentOffer, Selectspeciality, CreateDoctor, EditDoctor, ContentDoctor, Stars,
  CreateTime, Details, ImageSelect, Header, SubHeader, TableHead, PreviewOffer, Textarea, PreviewDoctor,
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
  BiSolidCloudUpload, AiOutlineDelete, AiOutlineEdit, PiStethoscopeBold, MdEmail, BsStarFill, BsStarHalf, BsStar,
  //images
  headerPhoto,
  //functions
  handleDeleteItem, handleCreate, handleGet, handleUpdate,
}

