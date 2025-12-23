"use client"
import React, { useState, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface AccordionProps {
  sectionData: Record<string, unknown>[];
}

const Accordion = ({ sectionData }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  
  const onItemClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <AnimatePresence>
      <div className="min-h-full w-full flex justify-center items-center py-10">
        <motion.div
          ref={ref}
          className="accordion w-full min-[350px]:w-[350px] md:w-[700px] max-w-lg rounded-[100px]"
          initial={{ x: -300 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          {sectionData.map((item, index) => (
            <div className="accordion-item break-words text-wrap" key={index}>
              <div
                className={`accordion-title cursor-pointer py-4 px-6 bg-gray-200 border-b border-gray-300 flex justify-between flex-wrap ${index === activeIndex ? 'bg-gray-300' : ''}`}
                onClick={() => onItemClick(index)}
              >
                {Object.keys(item).map((prop, idx) =>
                  prop.includes('Question') && prop !== '_id' && (
                    <h5 key={idx} className="text-lg font-semibold">
                      {String(item[prop])}
                    </h5>
                  )
                )}
                <button className="toggleOpen">
                  {index === activeIndex ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </button>
              </div>
              {index === activeIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="accordion-content bg-white py-4 px-6 border-b border-gray-300"
                >
                  {Object.keys(item).map((prop, idx) =>
                    prop.includes('Answer') && prop !== '_id' && (
                      <h3 key={idx} className="text-base">
                        {String(item[prop])}
                      </h3>
                    )
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Accordion;

