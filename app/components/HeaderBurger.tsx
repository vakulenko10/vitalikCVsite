"use client"
import React, { ChangeEvent } from 'react';

interface HeaderBurgerProps {
  classes?: string;
  handleBurgerChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSmallHeaderActive: boolean;
}

const HeaderBurger = ({ classes, handleBurgerChange, isSmallHeaderActive }: HeaderBurgerProps) => {
  const isChecked = isSmallHeaderActive !== undefined ? isSmallHeaderActive : false;
  
  return (
    <>
      <label className={`burger md:hidden `} htmlFor="burger">
        <input type="checkbox" id="burger" checked={isChecked} onChange={handleBurgerChange} />
        <span className='white'></span>
        <span className='white'></span>
        <span className='white'></span>
      </label>
    </>
  );
};

export default HeaderBurger;

