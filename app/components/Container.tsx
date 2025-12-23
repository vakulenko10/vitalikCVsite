import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  classes?: string;
}

const Container = ({ children, classes = "" }: ContainerProps) => {
  return (
    <div className={`h-full relative max-w-[1240px] px-4 l:px-0 mx-auto p-0 ${classes}`}>{children}</div>
  );
};

export default Container;




