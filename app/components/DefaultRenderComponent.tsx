"use client"
import Image from 'next/image';
import React from 'react';
import { renderTextByProperty } from './mainconsts';
import { easeInOut, motion } from 'framer-motion';

interface DefaultRenderComponentProps {
  sectionData: Record<string, unknown>[];
}

const DefaultRenderComponent = ({ sectionData }: DefaultRenderComponentProps) => {
  const activeItem = sectionData[0];
  const activeItemProps = Object.keys(activeItem);
  
  return (
    <div className='flex flex-col justify-end items-center min-h-[80vh] md:gap-10 md:grid md:grid-cols-2 md:items-center md:justify-start py-10'>
      <motion.div
        whileTap={{ scale: 0.8, transition: { duration: 0.3 } }}
        className='order-2  justify-self-center flex md:order-1 justify-center items-center md:justify-end md:items-end relative h-1/2 md:h-full'
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: easeInOut }}
        initial={{ scale: 1.3, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        {/* Render image on the right side */}
        {activeItemProps.includes('imageURL') && (
          <img
            src={String(activeItem['imageURL'])}
            className='w-full md:h-3/4 md:w-auto  object-contain '
            alt="Image"
          />
        )}
      </motion.div>
      
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        initial={{ opacity: 0, x: -100 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.8, transition: { duration: 0.3 } }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='order-1 md:order-2 flex flex-col gap-[20px] md:justify-self-start text-center md:text-start items-center justify-self-center'
      >
        {/* Render text data on the left side */}
        <div className='text py-10 '>
          {activeItemProps.map((prop, index) => {
            if (prop !== 'imageURL' && prop !== '_id') {
              return (
                renderTextByProperty(prop, String(activeItem[prop] || ''), index, 'text-white welcome md:table ')
              );
            }
            return null; // Skip rendering imageURL and _id here
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default DefaultRenderComponent;

