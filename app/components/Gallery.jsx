"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { renderTextByProperty } from './mainconsts';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BsFillEyeFill } from "react-icons/bs";
const Gallery = ({ sectionData , sectionName}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPortfolioItemOpened, setIsPortfolioItemOpened] = useState(false);

  const [animatedIndexes, setAnimatedIndexes] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref)
  
  const handleItemClick = (item) => {
    // console.log('item clicked')
    setIsPortfolioItemOpened(true);
    setSelectedItem(item);
  };
 
  const handleClose = (e) => {
    e.stopPropagation();
    // console.log('close')
    setIsPortfolioItemOpened(false);
    setSelectedItem(null);
  };
  
  return (
    <div className='pt-10'>
    
    <motion.div className='mx-auto  pb-[100px] flex flex-col gap-10  flex-wrap justify-center items-center h-full place-items-center' ref={ref} initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.1, repeat: 0}}>
      {sectionData.map((sectionItem, index) => (
        <motion.div key={index}
        initial={{opacity: 0}} whileInView={{opacity: 1, delay:1,duration: 4}}
        whileHover={{scale: 1.05}}
        className='group group-hover:h-full shadow-[0_0_20px]hover:shadow-[0_0_70px] transition box-border md:w-3/4 h-full md:my-1 md:justify-center md:items-center md:flex-col justify-center items-center md:mx-3 object-cover object-center overflow-hidden relative bg-[#ffffff] p-4 rounded-xl'>
          <div className='rounded-lg  relative box-border overflow-hidden '>
          <div className=' rounded-lg transition duration-150 content z-10 absolute top-0 left-0 h-full w-full  group-hover:flex justify-center items-center  group-hover:bg-[#000000c9]'>
            <div className='links hidden group-hover:flex gap-10'>
            <Link target="_blank" className='transition bg-[#ffffff32] hover:bg-[#ffffffb2] rounded-full p-2' href={sectionItem['projectURL']}>
              <BsFillEyeFill  className=' transition w-[50px]  h-auto fill-[#fff]' />
              </Link>
            <Link target="_blank"  className='transition bg-[#ffffff32] hover:bg-[#ffffffb2] rounded-full p-2 ' href={sectionItem['gitHubRepoURL']}>
              <FaGithub className=' transition  w-[50px]  h-auto fill-[#fff]' />
            </Link>
            </div>
          </div>
          <img
            className='z-9 object-cover w-full group-hover:scale-[1.1] transition object-center overflow-hidden box-border rounded-lg '
            src={sectionItem['imageURL']}
            alt={index}
          /></div>
        <div className='text-center pt-10'>{
              Object.keys(sectionItem).map((prop, index) => {
                if (prop !== 'imageURL' && !prop.includes('URL')) {
                  return renderTextByProperty(prop, sectionItem[prop], index, `text-black md:text-white md:group-hover:text-black ${sectionName}`) 
                }
                return
                })
            } 
        </div> 
      </motion.div>
        
      ))}
       
    </motion.div>
    </div>
  );
};

export default Gallery;
