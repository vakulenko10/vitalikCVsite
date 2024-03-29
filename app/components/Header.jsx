
"use client"
import React, { useEffect, useState } from 'react';
import Container from './Container';
import HeaderBurger from './HeaderBurger';
import LinksContainer from './LinksContainer';
import { useLanguage } from './LanguageContext';

// const [isSmallHeaderActive, setIsSmallHeaderActive] = useState(false);
{/* <LinksContainer isSmallHeaderActive={isSmallHeaderActive} setIsSmallHeaderActive={setIsSmallHeaderActive}/> */}
const Header = () => {
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);
  const [isSmallHeaderActive, setIsSmallHeaderActive] = useState(false);
  const {language, setLanguage} = useLanguage();

  const languageList = ['en', 'ua', 'pl']
  const handleBurgerChange = (e) => {
    setIsSmallHeaderActive(e.target.checked);
  };
  const changeLanguage = (lang) =>{
    setLanguage(lang);
  }
  return (
    <header className={` w-full  text-white z-[999] absolute `}>
      <Container>
        <nav className="px-4 lg:px-6 py-2.5 flex justify-between items-center">
          <h5 className={`text-2xl md:visible  `}>*#%#</h5>
          <LinksContainer isSmallHeaderActive={isSmallHeaderActive} setIsSmallHeaderActive={setIsSmallHeaderActive} />
          
          <HeaderBurger classes={''} handleBurgerChange={handleBurgerChange} isSmallHeaderActive={isSmallHeaderActive}/>
        </nav>
      </Container>
    </header>
  );
};

export default Header;