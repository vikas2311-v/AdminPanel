import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import Head from './Header.module.css';

function Header({ OpenSidebar }) {
  return (
    <header className={Head.header}>
        <div className={Head.menuIcon}>
            <BsJustify className={Head.icon} onClick={OpenSidebar} />
        </div>
        <div className={Head.headerLeft}>
            <BsSearch className={Head.icon} />
        </div>
        <div className={Head.headerRight}> 
            <BsFillBellFill className={Head.icon} />
            <BsFillEnvelopeFill className={Head.icon} /> 
            <BsPersonCircle className={Head.icon} /> 
        </div>
    </header>
  );
}

export default Header;
