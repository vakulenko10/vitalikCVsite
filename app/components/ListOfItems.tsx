 "use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ListOfItemsProps {
  sectionData?: Record<string, unknown>[];
}

const ListOfItems = ({ sectionData = [] }: ListOfItemsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  
  return (
    <motion.div ref={ref} className="flex flex-col justify-center items-center py-6 sm:py-8 px-4">
      <motion.div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 w-full max-w-4xl mx-auto">
        {sectionData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            key={index}
            className="flex flex-col items-center justify-end w-[90px] sm:w-[100px] md:w-[110px]"
          >
            {Object.keys(item).map((prop, ind) => {
              if (prop === '_id') return null;
              return prop === 'imageURL' ? (
                <motion.img
                  key={ind}
                  whileTap={{ rotate: 12, transition: { duration: 0.3 } }}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain order-1 flex-shrink-0"
                  src={String(item[prop] || "")}
                  alt=""
                />
              ) : (
                <h3 key={ind} className="text-black order-2 text-center text-sm sm:text-base font-medium mt-2 break-words cursor-default">
                  {String(item[prop] || "")}
                </h3>
              );
            })}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ListOfItems;

