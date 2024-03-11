import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
const ListOfItems = ({ sectionData , sectionName}) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  return (
    <motion.div ref={ref} className='flex flex-col justify-center items-center'>
    <motion.h1 initial={{ opacity: 0, x: 200 }}
        whileInView={{opacity: 1, x: 0 }}  transition={{ duration: 0.2 }} className='text-center text-white capitalize'>{sectionName}</motion.h1>
    
      <motion.div className='pt-[20px] gap-5 md:pt-[100px] flex w-full min-[500px]:w-4/5 md:w-3/5 items-baseline justify-center md:items-baseline md:gap-8 flex-wrap'>
      {sectionData.map((item, index) => (
        <motion.div initial={{ opacity: 0, x: -index }}
        whileInView={{opacity: 1, x: 0 }}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 1.1}}
        transition={{ duration: 0.2 }} key={index} className='flex flex-col box-border w-[100px] items-center justify-end '> {/* Ensure each item in a list has a unique key */}
          {Object.keys(item).map((prop, ind) => (
            prop === 'imageURL' ? 
              <img key={ind} className="textw-[35px] md:w-[50px] order-1 object-cover cursor-default" src={item[prop]} alt={ind} /> :
              <h3 key={ind} className='text-black order-2 cursor-default'>{item[prop]}</h3>
          ))}
        </motion.div>
      ))}
      </motion.div>
      {/* <div className=' order-1 md:order-2 justify-center items-center flex flex-col'>
      
          
      </div> */}
    </motion.div>
  );
};

export default ListOfItems;
