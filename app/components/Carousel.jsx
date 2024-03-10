import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { renderTextByProperty } from './mainconsts';
import { FaArrowRight, FaCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
const Carousel = ({ sectionData }) => {
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
    <div className='w-full h-full relative '>
      <AnimatePresence mode='wait'>
        <motion.div
          className='relative h-full'
          
        >
          <motion.div onClick={nextItem} className='h-[100vh] md:h-full md:grid md:grid-cols-2 gap-[10px] items-center justify-center relative flex flex-col overflow-hidden' key={activeIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          ref={ref}>
          <motion.div className='h-1/2 md:h-3/4 overflow-hidden relative' initial={{x: 100}} whileInView={{x:0}} >
            {/* Render image on the right side */}
            {activeItemProps.includes('imageURL') && (
              <div className='w-full relative flex h-full overflow-hidden justify-center items-center '>
                <img src={activeItem['imageURL']} className='h-full w-full md:h-full object-contain' alt="Image" />
                {activeItemProps.includes('imageDate') && (
                  <h6 className='text-white absolute bottom-0 left-2/5 z-10'>{activeItem['imageDate']}</h6>
                )}
              </div>
            )}
          </motion.div>
          <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} className='relative flex flex-col gap-[20px] justify-end text-center md:text-left items-center md:items-start text-white'>
          
            {/* Render text data on the left side */}
            <div className='w-full overflow-hidden  text break-words flex flex-wrap flex-col justify-between'>
              {activeItemProps.map((prop, index) => {
                if (prop !== 'imageURL' && prop !== 'imageDate') {
                  return (
                    renderTextByProperty(prop, activeItem[prop], index, 'inherit')
                  );
                }
                return null; // Skip rendering imageURL here
              })}
            </div>
          </motion.div>
          </motion.div>
          {/* <motion.button onClick={prevItem} className='absolute top-1/2 left-0 z-100 bg-white rounded-lg p-3' transition={{duration: 0.3}} whileTap={{scale: 0.9, rotate: '-3deg'}} whileHover={{scale: 1.1, rotate: '-3deg'}}><FaArrowLeft /></motion.button>
          <motion.button onClick={nextItem} className='absolute top-1/2 right-0 z-100 bg-white rounded-lg p-3' transition={{duration: 0.3}} whileTap={{scale: 0.9, rotate: '3deg'}} whileHover={{scale: 1.1, rotate: '3deg'}}><FaArrowRight /></motion.button> */}
          </motion.div>
      </AnimatePresence>
      <div className='absolute bottom-[20px] left-0 right-0 flex justify-center gap-2'>
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
