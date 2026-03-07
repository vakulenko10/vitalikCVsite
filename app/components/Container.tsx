 "use client";

import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  classes?: string;
}

const Container = ({ children, classes = "" }: ContainerProps) => {
  return (
    <div className={`h-full relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 box-border ${classes}`}>
      {children}
    </div>
  );
};

export default Container;




