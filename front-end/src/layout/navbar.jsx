import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { useState } from 'react';

function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const handleMenuClick = () => {
    setIsMenuActive(!isMenuActive);
  }

  return (
    <nav className="border-b select-none sticky top-0 left-0 w-full z-50 bg-white">
      <div className="py-2.5 px-2.5 flex flex-row items-center content-between container mx-auto text-dark-color relative ">
        <div className="text-2xl mr-10 font-black text-teal-color cursor-pointer whitespace-nowrap">Clinic App</div>
        <ul className={`${isMenuActive ? 'flex' : 'hidden'} absolute md:static top-[53px] md:top-0 left-0 space-y-3 md:space-y-0
        bg-white md:bg-transparent px-[100px] py-8 md:px-0 md:py-0 z-10 md:z-0 shadow-lg md:shadow-none 
          w-full rounded-b-lg md:rounded-none flex-col items-center md:flex md:flex-row md:grow font-medium`}>
          <li className="md:mr-4 mr-0 link-hover">Search</li>
          <li className="md:mr-4 mr-0 link-hover">Services</li>
          <li className="md:mr-4 mr-0 link-hover">Offers</li>
          <li className="md:mr-auto mr-0 link-hover">Testimonials</li>
          <div className="md:mr-1 mr-0 link-hover border border-transparent">Sign in</div>
          <div className="link-border-hover">Sign up</div>
        </ul>
        <div className="md:hidden ml-auto block">
          <PiDotsThreeOutlineVerticalFill
            onClick={handleMenuClick}
            className={`text-2xl text-teal-color font-bold cursor-pointer transition-all duration-300 
              ${isMenuActive ? 'rotate-[-90deg]' : 'rotate-0'}`} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
