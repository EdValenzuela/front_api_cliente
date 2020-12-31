import React from "react";
import Menu from "./Menu";
import { Link } from 'react-router-dom';

import { IconContext } from "react-icons";
import { BsFillPersonFill } from "react-icons/bs";


const Header = () => {
  return (
    <>
    <header className="text-gray-600 body-font bg-blue-500">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="flex items-center ml-3 text-xl text-white uppercase cursor-pointer animate-pulse">
            API Market
            <IconContext.Provider value={{ color: "white", size:'1.5rem', style:{ marginLeft: '10px' }}}>
              <div><BsFillPersonFill /></div>
            </IconContext.Provider>
          </span>
        </Link>
        <Menu />
      </div>
    </header>
    </>
  );
};

export default Header;
