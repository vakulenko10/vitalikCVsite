import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
const ListOfItems = ({ sectionData }) => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  return (
    <motion.div ref={ref} className='flex flex-col justify-center items-center'>
    
    
      <motion.div className=' gap-5 flex w-full min-[500px]:w-4/5 md:w-3/5 items-baseline justify-center md:items-baseline md:gap-8 flex-wrap'>
      {sectionData.map((item, index) => (
        <motion.div initial={{ opacity: 0, x: -index }}
        
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        whileInView={{opacity: 1, x: 0 }}
        whileHover={{scale: 1.1}}
        transition={{ duration: 0.2 }} key={index} className='flex flex-col box-border w-[100px] items-center justify-end '> {/* Ensure each item in a list has a unique key */}
          {Object.keys(item).map((prop, ind) => (
            prop === 'imageURL' ? 
              <motion.img key={ind}  whileTap={{rotate: "15deg", transition: 2}} className="textw-[35px] md:w-[50px] order-1 object-cover cursor-default" src={item[prop]} alt={ind} /> :
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
