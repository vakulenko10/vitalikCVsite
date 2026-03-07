"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, PanInfo } from 'framer-motion';
import { renderTextByProperty } from './mainconsts';
import { FaCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  sectionData?: Record<string, unknown>[];
  items?: Record<string, unknown>[];
  data?: Record<string, unknown>[];
  sectionName?: string;
  title?: string;
  name?: string;
}

const Carousel = (props: CarouselProps) => {
  const sectionDataRaw =
    props.sectionData ??
    props.items ??
    props.data ??
    [];

  const sectionData: Record<string, unknown>[] = Array.isArray(sectionDataRaw)
    ? sectionDataRaw
    : [];

  const sectionName =
    props.sectionName ??
    props.title ??
    props.name ??
    'items';

  if (!sectionData.length) {
    return null;
  }

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

  const arrowClass =
    'flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--section-bg,transparent)] bg-white/25 hover:bg-white/40 active:bg-white/30 backdrop-blur-sm border border-white/30 shadow-md';

  return (
    <div className="carousel flex flex-col min-h-0 flex-1 box-border overflow-hidden py-4 sm:py-6 md:py-8 relative">
      {/* Subtle decorative blob - adds depth without overlapping content */}
      <div
        className="pointer-events-none absolute -bottom-8 -right-8 w-40 h-40 sm:w-56 sm:h-56 opacity-[0.08] rounded-full bg-white blur-2xl"
        aria-hidden
      />
      <div className="flex-1 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] w-full min-w-0 flex items-stretch gap-2 sm:gap-3 relative z-10" style={{ contain: 'layout style paint' }}>
        {/* Arrows outside scroll: never overlap content */}
        {sectionData.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevItem}
              className={`${arrowClass} self-center`}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 pointer-events-none" />
            </button>
            <div className="flex-1 min-w-0 overflow-hidden relative">
              <motion.div
                ref={scrollContainerRef}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                className="h-full w-full flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  overflowY: 'hidden',
                  overflowX: 'scroll',
                  contain: 'layout style paint',
                }}
              >
                {sectionData.map((item, itemIndex) => {
                  const itemProps = Object.keys(item);
                  return (
                    <div
                      key={itemIndex}
                      className="h-full w-full flex-shrink-0 snap-center flex flex-col md:grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center md:items-stretch justify-start md:justify-center box-border px-3 sm:px-4 md:px-5"
                      style={{ minWidth: '100%', maxWidth: '100%' }}
                    >
                      {/* Card container: glass style, rounded, no overlap with arrows */}
                      <div className="h-full w-full min-h-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 shadow-xl flex flex-col md:grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center md:items-stretch justify-center p-4 sm:p-5 md:p-6">
                        <div className="w-full flex-shrink-0 md:min-h-0 overflow-hidden flex justify-center items-center min-h-0">
                          {itemProps.includes('imageURL') && (
                            <img
                              src={String(item['imageURL'])}
                              className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-full h-auto max-h-[160px] sm:max-h-[200px] md:max-h-[280px] object-contain"
                              alt=""
                              draggable={false}
                            />
                          )}
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: 0.3 }}
                          className="relative flex flex-col gap-2 sm:gap-3 justify-center text-center md:text-left items-center md:items-start text-white min-w-0 w-full overflow-hidden"
                          style={{ zIndex: 10 }}
                        >
                          <div className="w-full min-w-0 overflow-hidden space-y-1.5 sm:space-y-2 text break-words">
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
                    </div>
                  );
                })}
              </motion.div>
            </div>
            <button
              type="button"
              onClick={nextItem}
              className={`${arrowClass} self-center`}
              aria-label="Next slide"
            >
              <FaChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 pointer-events-none" />
            </button>
          </>
        )}

        {sectionData.length === 1 && (
          <div className="flex-1 min-w-0 overflow-hidden relative">
            <div className="h-full w-full flex px-3 sm:px-4">
              {sectionData.map((item, itemIndex) => {
                const itemProps = Object.keys(item);
                return (
                  <div key={itemIndex} className="h-full w-full flex flex-col md:grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center md:items-stretch justify-center box-border px-0">
                    <div className="h-full w-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 shadow-xl flex flex-col md:grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 items-center md:items-stretch justify-center p-4 sm:p-5 md:p-6">
                      <div className="w-full flex-shrink-0 md:min-h-0 overflow-hidden flex justify-center items-center">
                        {itemProps.includes('imageURL') && (
                          <img src={String(item['imageURL'])} className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-full h-auto max-h-[160px] sm:max-h-[200px] md:max-h-[280px] object-contain" alt="" draggable={false} />
                        )}
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3 justify-center text-center md:text-left items-center md:items-start text-white min-w-0 w-full">
                        <div className="w-full min-w-0 space-y-1.5 sm:space-y-2 text break-words">
                          {itemProps.map((prop, index) => {
                            if (prop !== 'imageURL' && prop !== 'imageDate' && prop !== '_id') {
                              return renderTextByProperty(prop, String(item[prop] || ''), index, ` ${sectionName}`);
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {sectionData.length > 1 && (
        <div className="flex-shrink-0 flex justify-center pt-4 pb-1 z-20">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10" role="tablist" aria-label="Carousel slides">
            {sectionData.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goToItem(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Slide ${index + 1}`}
                className={`transition-all duration-200 rounded-full touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 h-2 sm:h-2.5 ${
                  index === activeIndex
                    ? 'w-6 sm:w-8 bg-white shadow-sm'
                    : 'w-2 sm:w-2.5 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;

