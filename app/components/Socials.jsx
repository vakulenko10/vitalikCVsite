import Link from 'next/link'
import React from 'react'


import { FaLinkedin, FaGithub  } from "react-icons/fa";
const Socials = () => {
  return (
    <div className='hidden md:flex absolute bottom-0 right-0 flex-col gap-3 z-[20] justify-end items-end rounded-lg  p-3 m-1'>
        <Link href="https://www.linkedin.com/in/vitalik-vakulenko/"><FaLinkedin className=" fill-white hover:fill-[#ffffffeb] transition" size={30} /></Link>
        <Link href="https://github.com/vakulenko10"><FaGithub className="fill-white hover:fill-[#ffffffeb] transition" size={30}/></Link>
    </div>
  )
}

export default Socials