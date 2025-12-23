import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, PanInfo } from 'framer-motion';
import { renderTextByProperty } from './mainconsts';
import { FaCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  sectionData: Record<string, unknown>[];
  sectionName: string;
}

const Carousel = ({ sectionData, sectionName }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollContainerRef);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isDragging) return;
      
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  const goToItem = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const itemWidth = container.clientWidth;
    container.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const nextItem = () => {
    const nextIndex = (activeIndex + 1) % sectionData.length;
    goToItem(nextIndex);
  };

  const prevItem = () => {
    const prevIndex = (activeIndex - 1 + sectionData.length) % sectionData.length;
    goToItem(prevIndex);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const threshold = 50;
    const itemWidth = container.clientWidth;

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0 && activeIndex > 0) {
        goToItem(activeIndex - 1);
      } else if (info.offset.x < 0 && activeIndex < sectionData.length - 1) {
        goToItem(activeIndex + 1);
      } else {
        goToItem(activeIndex);
      }
    } else {
      goToItem(activeIndex);
    }
    
    setIsDragging(false);
  };

  return (
    <div className='carousel h-[80%] relative box-border pb-10 overflow-hidden'>
      {/* Arrow buttons */}
      {sectionData.length > 1 && (
        <>
          <button
            onClick={prevItem}
            className='absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 md:p-3 transition-all duration-200 backdrop-blur-sm'
            aria-label="Previous item"
          >
            <FaChevronLeft className='text-white' size={20} />
          </button>
          <button
            onClick={nextItem}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 md:p-3 transition-all duration-200 backdrop-blur-sm'
            aria-label="Next item"
          >
            <FaChevronRight className='text-white' size={20} />
          </button>
        </>
      )}

      <div className='h-full w-full overflow-hidden relative' style={{ contain: 'layout style paint' }}>
        <motion.div
          ref={scrollContainerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          className='h-full w-full flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            overflowY: 'hidden',
            overflowX: 'scroll',
            contain: 'layout style paint',
            paddingLeft: '0px',
            paddingRight: '0px',
          }}
        >
        {sectionData.map((item, itemIndex) => {
          const itemProps = Object.keys(item);
          
          return (
            <div
              key={itemIndex}
              className='h-full w-full flex-shrink-0 snap-center md:grid md:grid-cols-2 gap-[10px] items-center box-border justify-start md:justify-center flex flex-col px-2 md:px-16'
              style={{ minWidth: '100%', maxWidth: '100%', width: '100%' }}
            >
              <div className='box-border justify-self-center overflow-hidden relative h-full w-full'>
                {itemProps.includes('imageURL') && (
                  <img
                    src={String(item['imageURL'])}
                    className='h-full w-full object-contain'
                    alt="Image"
                    draggable={false}
                  />
                )}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
                className='relative flex flex-col gap-[20px] justify-end text-center md:text-left items-center md:items-start text-white'
                style={{ zIndex: 10 }}
              >
                <div className='w-full overflow-hidden text break-words flex flex-wrap flex-col md:justify-start md:items-start justify-between items-center pr-0 md:pr-4'>
                  {itemProps.map((prop, index) => {
                    if (prop !== 'imageURL' && prop !== 'imageDate' && prop !== '_id') {
                      return (
                        renderTextByProperty(prop, String(item[prop] || ''), index, ` ${sectionName}`)
                      );
                    }
                    return null;
                  })}
                </div>
              </motion.div>
            </div>
          );
        })}
        </motion.div>
      </div>
      
      {/* Indicator dots - larger and more clickable */}
      <div className='absolute mt-[10px] bottom-[20px] left-1/2 transform -translate-x-1/2 flex justify-center gap-2 z-20'>
        {sectionData.map((item, index) => (
          <button
            key={index}
            onClick={() => goToItem(index)}
            className={`transition-all duration-200 ${
              index === activeIndex 
                ? 'w-8 h-2 bg-white rounded-full' 
                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

