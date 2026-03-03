"use client";

import React from 'react';
import { renderTextByProperty } from './mainconsts';
import { motion } from 'framer-motion';

interface DefaultRenderComponentProps {
  sectionData?: Record<string, unknown>[];
}

const DefaultRenderComponent = ({ sectionData = [] }: DefaultRenderComponentProps) => {
  if (!Array.isArray(sectionData) || sectionData.length === 0) {
    return null;
  }

  const activeItem = sectionData[0];
  const activeItemProps = Object.keys(activeItem);
  
  return (
    <div className='flex flex-col justify-end items-center min-h-[100vh] md:min-h-[100vh] md:gap-8 md:grid md:grid-cols-2 md:items-stretch md:justify-items-stretch pt-10 pb-0 md:pt-6 md:pb-0'>
      {/* On small screens: mt-auto pushes character to section bottom so he peeks from bottom */}
      <motion.div
        className='order-2 w-full flex md:order-1 justify-center items-end md:justify-center relative min-h-0 md:min-h-0 md:h-full overflow-hidden mt-auto md:mt-0'
      >
        {/* Character: peeks up from bottom after background finishes */}
        {activeItemProps.includes('imageURL') && (
          <motion.img
            src={String(activeItem['imageURL'])}
            className='welcome-character-img w-full max-w-full max-h-[88vh] md:max-h-[92vh] object-contain object-bottom'
            alt=""
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 22,
              mass: 0.8,
              delay: 1.35,
            }}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 2.15 }}
        className='order-1 md:order-2 flex flex-col justify-center gap-4 text-center md:text-start items-center md:items-start px-4 md:px-0'
      >
        {/* Text block: fades in place just after character peeks out */}
        <div className='text py-6 md:py-0'>
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

