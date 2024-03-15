"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import Section from './Section';
import { SectionIndex, SectionToRenderType, sectionClasses } from './mainconsts';
import Container from './Container';
import Loader from './Loader';
import { motion, useViewportScroll,useTransform , useInView, AnimatePresence  } from 'framer-motion';
export const HelloBg = () => {
  const ref = useRef(null);
   const inView = useInView(ref);
  return <AnimatePresence mode='wait'><motion.div ref={ref} className='top-0 left-0 w-full h-full z-0'>
  <motion.div initial={{height: '300%',y: 500,}} animate={{height:'100%',y: 0}} transition={{delay:0, duration: 1}}  whileInView={{scaleY: 1}} className=' absolute top-0 z-1 h-3/4 w-full bg-[#A5DD9B] '></motion.div>
  <motion.div initial={{y: 500,}}   animate={{height:'75%', y:0}} transition={{delay: 0.1, duration:1 }}  whileInView={{scaleY: 1}} className='absolute top-1/4 z-2 h-1/2 w-full bg-[#C5EBAA]'><motion.div></motion.div></motion.div>
  <motion.div initial={{height: '300%',y: 500,}}  animate={{height: '50%', y:0}} transition={{ delay:0.2 ,duration:1}} className='z-3 absolute top-1/2  h-1/4 w-full bg-[#F6F193]'></motion.div>
  <motion.div initial={{height: '300%', y:300}}  animate={{height: '25%', y:0}} transition={{delay:0.3,  duration:1}} className='z-4 absolute top-3/4 h-1/4 w-full bg-[#F2C18D]'></motion.div>
</motion.div></AnimatePresence>
}
function Sections() {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const { scrollYProgress } = useViewportScroll()
const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchContentFromDB');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        
        // Extract collection names from the keys of the JSON object
        const collectionNames = Object.keys(jsonData.data);
        setCollections(collectionNames);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collections.length) {
    return <Container  classes={`flex justify-center items-center h-screen relative`}>
        <Loader/>
    </Container>
  }
  // const portfolioBG = () => {
  //   return 
  // }
  const backgroundToSection = {
    "myportfolioitems": <div className='top-0 left-0 w-full h-full absolute z-0'>
      <div className='h-[10%] w-full bg-[#F6F193]'></div>
      <div className='h-[10%]  w-full bg-[#F6F193]'></div>
      <div className='h-[10%]  w-full bg-[#F6F193]'></div>
    <div className='h-[10%]   w-full bg-[#C5EBAA]'>.</div>
    <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
      <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
      <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
    <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
    <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
      <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
    
    
</div>,
    "helloitems": <HelloBg/>,
    "skillitems": <div className='top-0 left-0 w-full h-full absolute z-0'>
    <div className='h-1/4 w-full bg-[#A5DD9B]'></div>
    <div className='h-1/4 w-full bg-[#A5DD9B]'></div>
    <div className='h-1/4 w-full bg-[#A5DD9B]'></div>
    <div className='h-1/4 w-full bg-[#C5EBAA]'></div>
    </div>,
   "mynewsitems":  <div className='top-0 left-0 w-full h-full absolute z-0'>
   <div className='h-1/4 w-full bg-[#C5EBAA]'></div>
   <div className='h-1/4 w-full bg-[#C5EBAA]'></div>
   <div className='h-1/4 w-full bg-[#C5EBAA]'></div>
   <div className='h-1/4 w-full bg-[#C5EBAA]'></div>
   </div>,
  }
  return (
    <ul>
      {Object.entries(SectionIndex).map(([collectionName, index]) => (
        <li key={index}>
          {/* Pass the collectionName and corresponding index as props to the Section component */}
          <Section
            collectionName={collectionName}
            index={index}
            renderType={SectionToRenderType[collectionName]}
            classes={sectionClasses[collectionName]}
            backgroundItem={backgroundToSection[collectionName]}
            
          />
        </li>
      ))}
    </ul>
  );
}

export default Sections;
