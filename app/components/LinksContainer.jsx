"use client"
import React from 'react'
import { Sections } from './mainconsts'
import Link from 'next/link'
import { useLanguage } from './LanguageContext'

const LinksContainer = ({isSmallHeaderActive, setIsSmallHeaderActive}) => {
  const {language, setLanguage} = useLanguage();

  const languageList = ['en', 'ua', 'pl']
  const handleBurgerChange = (e) => {
    setIsSmallHeaderActive(e.target.checked);
  };
  const changeLanguage = (lang) =>{
    setLanguage(lang);
    setIsSmallHeaderActive(false)
  }
    const handleLinkClick = () =>{
        
         setIsSmallHeaderActive(false)
        
       
    }
    // console.log("Sections:", Sections)
  return (
    <div className={`justify-center items-center md:flex gap-1 ${isSmallHeaderActive?`md:relative fixed inset-x-0 inset-y-0 pt-10 p-3 bg-[#949494]  h-screen md:h-auto md:block md:bg-inherit md:p-0`:`hidden`} `}>
        <ul className={`md:bg-transparent ${isSmallHeaderActive?`flex flex-col md:flex md:flex-row md:p-0 md:gap-[10px] md:bg-transparent `:`md:flex md:gap-[10px]`} `}>

            {Sections.map((link, index)=> <Link key={index} onClick={handleLinkClick} href={`#${link}`} className={`transition duration-200 ease-linear ${isSmallHeaderActive?`md:bg-transparent p-5 hover:bg-[#fafafa9e] md:hover:bg-transparent md:hover:text-[#ffffffec] md:p-0 `:`md:hover:text-[#ffffff80]`}`}>{link}</Link>)}
           
        </ul>
        <ul className='absolute bottom-1 left-0 md:relative flex items-start md:bg-[#0000001d] md:flex-row px-5 md:px-2 rounded-lg p-1'>
          {languageList.map((item, index)=>{
            return <li key={index}  onClick={() => changeLanguage(item)} className='flex cursor-pointer p-2 mx-1 bg-[#8383832c] hover:bg-[#c3c3c3e4] rounded-full md:m-0 text-white  md:bg-transparent md:text-white  md:hover:text-[#d6d6d6] md:hover:bg-transparent md:p-0 transition'>{item}{index!=languageList.length-1?<span className='hidden md:block'>/</span>:<></>}</li>
          })}</ul>
    </div>
  )
}

export default LinksContainer