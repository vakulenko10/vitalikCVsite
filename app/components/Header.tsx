"use client"
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Container from './Container';
import HeaderBurger from './HeaderBurger';
import LinksContainer from './LinksContainer';
import { useLanguage } from './LanguageContext';

const SCROLL_TOP_THRESHOLD = 20;
const SCROLL_UP_SHOW_THRESHOLD = 25;
const SCROLL_DOWN_MIN_DELTA = 3;

const Header = () => {
  const [isSmallHeaderActive, setIsSmallHeaderActive] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);
  const lastScrollY = useRef(0);
  const { language, setLanguage } = useLanguage();

  const languageList = ['en', 'ua', 'pl'];

  useEffect(() => {
    const getScrollY = () => {
      if (typeof window === 'undefined') return 0;
      return window.scrollY ?? document.documentElement.scrollTop ?? 0;
    };
    const onScroll = () => {
      const y = getScrollY();
      const prev = lastScrollY.current;
      if (y <= SCROLL_TOP_THRESHOLD) {
        setHeaderVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        if (y - prev >= SCROLL_DOWN_MIN_DELTA) {
          setHeaderVisible(false);
        } else if (prev - y >= SCROLL_UP_SHOW_THRESHOLD) {
          setHeaderVisible(true);
        }
      }
      lastScrollY.current = y;
    };
    lastScrollY.current = getScrollY();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (isSmallHeaderActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSmallHeaderActive]);

  useEffect(() => {
    const onResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        setIsSmallHeaderActive(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  const handleBurgerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSmallHeaderActive(e.target.checked);
  };
  
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };
  
  return (
    <header
      className={`w-full text-white z-[999] fixed top-0 left-0 right-0 md:absolute md:top-0 md:left-0 md:right-0 transition-[transform,background-color,backdrop-filter] duration-300 ease-out ${!headerVisible ? '-translate-y-full' : 'translate-y-0'} ${isScrolled ? 'bg-white/10 backdrop-blur-md' : ''}`}
    >
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




