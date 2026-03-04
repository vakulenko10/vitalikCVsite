"use client"
import React, { useState } from 'react';
import { Sections } from './mainconsts';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

interface LinksContainerProps {
  isSmallHeaderActive: boolean;
  setIsSmallHeaderActive: (value: boolean) => void;
}

const LinksContainer = ({ isSmallHeaderActive, setIsSmallHeaderActive }: LinksContainerProps) => {
  const { language, setLanguage } = useLanguage();
  const languageList = ['en', 'pl', 'ua'];
  const [languageIndex, setLanguageIndex] = useState<number>(0);
  
  const handleBurgerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSmallHeaderActive(e.target.checked);
  };
  
  const changeLanguage = () => {
    // Calculate the index of the next language
    const nextLanguageIndex = (languageIndex + 1) % languageList.length;
    // Update the language state directly
    setLanguage(languageList[nextLanguageIndex]);
  
    // Update the languageIndex state
    setLanguageIndex(nextLanguageIndex);
  
    // Close the small header
    setIsSmallHeaderActive(false);
  };
  
  const handleLinkClick = () => {
    setIsSmallHeaderActive(false);
  };

  return (
    <div className={`md:flex md:items-center md:gap-4 ${isSmallHeaderActive ? `fixed inset-0 z-[998] pt-20 pb-10 px-5 overflow-y-auto overscroll-contain h-screen flex flex-col bg-gradient-to-b from-[#F2C18D] to-[#e8b87a] md:bg-inherit` : `hidden`} ${!isSmallHeaderActive ? `` : `md:relative md:inset-auto md:pt-0 md:pb-0 md:px-0 md:overflow-visible md:bg-inherit md:h-auto`}`}
    >
      <ul className={`md:bg-transparent flex-1 ${isSmallHeaderActive ? `flex flex-col md:flex md:flex-row md:p-0 md:gap-[10px] md:bg-transparent gap-0` : `md:flex md:gap-[10px]`}`}>
        {Sections.map((link, index) => (
          <Link
            key={index}
            onClick={handleLinkClick}
            href={`#${link}`}
            className={`text-[22px] md:text-[20px] font-medium transition duration-200 ease-linear ${isSmallHeaderActive ? `md:bg-transparent py-4 px-5 rounded-xl hover:bg-white/20 md:hover:bg-transparent md:hover:text-[#ffffffec] md:py-0 md:px-0 md:rounded-none text-white` : `md:hover:text-[#ffffff80]`}`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        ))}
      </ul>
      <button
        title="Change language"
        className="langbtn font-bold px-6 py-2.5 rounded-full bg-[#C5EBAA] md:bg-[#F2C18D] text-white shadow-sm hover:opacity-95 active:opacity-90 transition-opacity mt-4 md:mt-0"
        onClick={changeLanguage}
      >
        <span className="text-sm">{language}</span>
      </button>
    </div>
  );
};

export default LinksContainer;




