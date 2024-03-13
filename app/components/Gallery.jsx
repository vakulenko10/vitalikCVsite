"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { renderTextByProperty } from './mainconsts';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BsFillEyeFill } from "react-icons/bs";
const Gallery = ({ sectionData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPortfolioItemOpened, setIsPortfolioItemOpened] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref)
  const handleItemClick = (item) => {
    console.log('item clicked')
    setIsPortfolioItemOpened(true);
    setSelectedItem(item);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    console.log('close')
    setIsPortfolioItemOpened(false);
    setSelectedItem(null);
  };
  useEffect(()=>{
    console.log("is in view:", isInView)
  }, [isInView])

  return (
    <>
    
    <motion.div className=' pb-[100px] flex flex-col flex-wrap justify-center items-center h-full place-items-center' ref={ref} initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}}>
      {sectionData.map((sectionItem, index) => (
        <motion.div
          key={index}
          initial={{x: 100}} whileInView={{x: 0}}
          className='group flex box-border my-2 md:w-1/2 md:my-1  lg:w-1/2 justify-center items-center md:mx-3 object-cover object-center overflow-hidden h-fit  relative'
          
      dragConstraints={{ left: 0, right: 0, top: 0, bottom:0 }}
          onClick={() => handleItemClick(sectionItem)}
        >
          <div className=' transition duration-150 content z-10 absolute top-0 left-0 h-full w-full  group-hover:flex justify-center items-center bg-[#000000a0] group-hover:bg-[#000000c9]'>
            <div className='links hidden group-hover:flex gap-10'>
            <Link target="_blank" className='transition bg-[#ffffff32] hover:bg-[#ffffffb2] rounded-full p-2' href={sectionItem['projectURL']}>
              <BsFillEyeFill  className=' transition w-[50px]  h-auto fill-[#fff]' />
              </Link>
            <Link target="_blank"  className='transition bg-[#ffffff32] hover:bg-[#ffffffb2] rounded-full p-2 ' href={sectionItem['projectURL']}>
              <FaGithub className=' transition  w-[50px]  h-auto fill-[#fff]' />
            </Link>
            </div>
          </div>
          <img
            className='z-9 object-cover w-full object-center overflow-hidden box-border '
            src={sectionItem['imageURL']}
            alt={index}
          />
          {/* {(selectedItem === sectionItem && selectedItem != null) && (
            <motion.div
              className={`${isPortfolioItemOpened && selectedItem === sectionItem ? 'fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#000000cd] bg-opacity-50 z-[1000] py-10' : 'hidden'}`}
            >
              <div className='PortfolioItemInfo p-4 h-full w-full overflow-y-scroll overflow-x-hidden text-wrap break-words'>
                <h3 className='text-white'>click on the image to experience the project online</h3>
                
                {Object.keys(selectedItem).map((prop, index) => {
                  if (prop !== 'imageURL' && prop !== 'projectURL') {
                    return renderTextByProperty(prop, selectedItem[prop], index, 'text-white ');
                  }
                  return
                  
                })}

                <button className='absolute top-0 right-0 mt-4 mr-4 bg-[#751a1ab1] text-white py-2 px-4 rounded-md z-[1]' onClick={handleClose}>
                  Close
                </button>
              </div>
            </motion.div>
          )} */}
        </motion.div>
      ))}
    </motion.div>
    </>
  );
};

export default Gallery;
