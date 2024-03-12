"use client"
import Image from 'next/image';
import React from 'react';
import {renderTextByProperty} from './mainconsts'
import { easeInOut, motion } from 'framer-motion';
const DefaultRenderComponent = ({ sectionData }) => {
    console.log("sectionData", sectionData)
    const activeItem = sectionData[0];
    console.log("activeItem: ", activeItem)
    const activeItemProps = Object.keys(activeItem);
    
    return (
        <div className='flex flex-col justify-between items-center h-[90%] md:gap-10 md:grid md:grid-cols-2 md:items-center md:justify-start'>
            <motion.div  whileTap={{scale: 0.8, transition: 0.3}} className=' justify-self-center flex md:order-1 justify-center items-center md:justify-end md:items-center relative h-full   overflow-hidden' whileHover={{scale: 1.05}} transition={{duration: 0.2, ease: easeInOut}} initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}>
                {/* Render image on the right side */}
                {activeItemProps.includes('imageURL') && (
                    <img src={activeItem['imageURL']} className='hidden md:block h-4/5 rounded-[50px] object-contain ' alt="Image" />
                )}
            </motion.div>
            <motion.div drag
  dragConstraints={{ left: 0, right:0, top: 0, bottom: 0 }}  initial={{ opacity: 0, x: -100}} whileHover={{scale: 1.1, transition: 0.3}} whileTap={{scale: 0.8, transition: 0.3}}
        animate={{ opacity: 1, x: 0}} transition={{ duration: 0.5, ease: "easeOut" }} className='order-1 md:order-2 flex flex-col gap-[20px] md:justify-self-start text-center md:text-start items-center justify-self-center'>
                {/* Render text data on the left side */}
                <div className='text py-10'>{activeItemProps.map((prop, index) => {
                    if (prop !== 'imageURL') {
                        return (
                            renderTextByProperty(prop, activeItem[prop], index, 'text-white text-[2rem] md:text-[1.5em] ')
                        );
                    }
                    return null; // Skip rendering imageURL here
                })}</div>
                
            </motion.div>
            <div className='md:hidden order-2 buttons-container flex flex-col justify-center items-center gap-1'>
                    <a href="https://www.linkedin.com/in/vitalik-vakulenko/"><motion.button whileHover={{scale: 1.03}} className='contact-btn p-3 mx-2 bg-[#ffffff] hover:bg-[#e7e7e7] rounded'><h3>contact me</h3></motion.button></a>
                    <a href="#Portfolio"><motion.button  whileHover={{scale: 1.03}} className='portfolio-btn p-3 mx-2  bg-[#ffffff] hover:bg-[#e7e7e7]  rounded'><h3>portfolio</h3></motion.button></a>
                    
                </div>
        </div>
    );
    // console.log("sectionData: ", JSON.stringify(sectionData))
    // return <div>{JSON.stringify(sectionData)}</div>
};

export default DefaultRenderComponent;
