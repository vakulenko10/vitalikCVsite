"use client"
import React, { useState, ChangeEvent } from 'react';
import Container from './Container';
import HeaderBurger from './HeaderBurger';
import LinksContainer from './LinksContainer';
import { useLanguage } from './LanguageContext';

const Header = () => {
  const [isSmallHeaderActive, setIsSmallHeaderActive] = useState<boolean>(false);
  const { language, setLanguage } = useLanguage();

  const languageList = ['en', 'ua', 'pl'];
  
  const handleBurgerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSmallHeaderActive(e.target.checked);
  };
  
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };
  
  return (
    <header className={` w-full  text-white z-[999] absolute `}>
      <Container>
        <nav className="px-4 lg:px-6 py-2.5 flex justify-between items-center">
          <h5 className={`text-2xl md:visible  `}>*#%#</h5>
          <LinksContainer isSmallHeaderActive={isSmallHeaderActive} setIsSmallHeaderActive={setIsSmallHeaderActive} />
          
          <HeaderBurger classes={''} handleBurgerChange={handleBurgerChange} isSmallHeaderActive={isSmallHeaderActive} />
        </nav>
      </Container>
    </header>
  );
};

export default Header;



