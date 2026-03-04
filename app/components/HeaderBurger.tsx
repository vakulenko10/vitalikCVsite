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
    <div className="relative z-[1000] md:hidden">
      <label className="burger" htmlFor="burger" aria-label={isChecked ? 'Close menu' : 'Open menu'}>
        <input type="checkbox" id="burger" checked={isChecked} onChange={handleBurgerChange} />
        <span className="white" />
        <span className="white" />
        <span className="white" />
      </label>
    </div>
  );
};

export default HeaderBurger;




