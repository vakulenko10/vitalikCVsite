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
    console.log('clicked');
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
    <div className={`justify-center items-center md:flex gap-1 ${isSmallHeaderActive ? `md:relative fixed inset-x-0 inset-y-0 pt-10 p-3 bg-[#F2C18D]  h-screen md:h-auto md:block md:bg-inherit md:p-0` : `hidden`} `}>
      <ul className={`md:bg-transparent ${isSmallHeaderActive ? `flex flex-col md:flex md:flex-row md:p-0 md:gap-[10px] md:bg-transparent ` : `md:flex md:gap-[10px]`} `}>
        {Sections.map((link, index) => (
          <Link 
            key={index} 
            onClick={handleLinkClick} 
            href={`#${link}`} 
            className={` text-[30px] md:text-[20px] transition duration-200 ease-linear ${isSmallHeaderActive ? `md:bg-transparent p-5 hover:bg-[#fafafa9e] md:hover:bg-transparent md:hover:text-[#ffffffec] md:p-0 ` : `md:hover:text-[#ffffff80]`}`}
          >
            {link}
          </Link>
        ))}
      </ul>
      <button 
        title='click to change the language' 
        className='langbtn  font-bold px-6 rounded-full bg-[#C5EBAA] md:bg-[#F2C18D]' 
        onClick={changeLanguage}
      >
        <h4 className='text-[#fff] langbtn-hover:text-[#fff]'>{language}</h4>
      </button>
    </div>
  );
};

export default LinksContainer;




