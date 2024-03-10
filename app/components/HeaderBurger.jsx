"use client"
import React, { useEffect, useState } from 'react'

const HeaderBurger = ({classes,handleBurgerChange, isSmallHeaderActive}) => {
    const isChecked = isSmallHeaderActive !== undefined ? isSmallHeaderActive : false;
  return (
    <>
    <label className={`burger md:hidden `} htmlFor="burger">
      <input type="checkbox" id="burger"  checked={isChecked} onChange={handleBurgerChange}/>
      <span className='white'></span>
      <span className='white'></span>
      <span className='white'></span>
    </label>
    </>
  )
}

export default HeaderBurger