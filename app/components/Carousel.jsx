import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { renderTextByProperty } from './mainconsts';
import { FaArrowRight, FaCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
const Carousel = ({ sectionData, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dataLength = sectionData.length;
  const ref = useRef(null)
  const isInView = useInView(ref)
  const nextItem = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % dataLength);
  };
  const goToItem = (index) => {
    setActiveIndex(index);
  };
  // const prevItem = () => {
  //   setActiveIndex((prevIndex) => (prevIndex - 1 + dataLength) % dataLength);
  // };

  const activeItem = sectionData[activeIndex];
  const activeItemProps = Object.keys(activeItem);

  return (
    <div className='carousel h-[80%] relative  box-border pb-10'>
      <AnimatePresence mode='wait'>
        <motion.div onClick={nextItem} className='h-full md:grid md:grid-cols-2 gap-[10px] items-center box-border justify-start md:justify-center flex flex-col overflow-hidden' key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            ref={ref}>
                <motion.div className='box-border justify-self-center overflow-hidden relative h-full' initial={{x: 100, scale: 1}} whileInView={{x:0}} whileHover={{scale: 1.01}} >
                  {activeItemProps.includes('imageURL') && (
                      <img src={activeItem['imageURL']} className='h-full object-contain' alt="Image" />
                    
                  )}
                </motion.div>
                <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}}  whileHover={{scale: 1.01}} className='relative flex flex-col gap-[20px] justify-end text-center md:text-left items-center md:items-start text-white'>
          
                    <div className='w-full overflow-hidden  text break-words flex flex-wrap flex-col md:justify-start md:items-start justify-between  items-center'>
                      {activeItemProps.map((prop, index) => {
                        if (prop !== 'imageURL' && prop !== 'imageDate') {
                          return (
                            renderTextByProperty(prop, activeItem[prop], index, ` ${sectionName}`)
                          );
                        }
                        return null; // Skip rendering imageURL here
                      })}
                    </div>
                </motion.div>

        </motion.div>
      </AnimatePresence>
        <div className='absolute mt-[10px] bottom-[20px] left-1/2 transform -translate-x-1/2 flex justify-center gap-2'>
        {sectionData.map((item, index) => (
          <FaCircle
            size={8}
            key={index}
            className={`cursor-pointer ${index === activeIndex ? 'fill-white' : 'fill-[#fff9]'}`}
            onClick={() => goToItem(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
