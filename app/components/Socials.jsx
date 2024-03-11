import Link from 'next/link'
import React from 'react'


import { FaLinkedin, FaGithub  } from "react-icons/fa";
const Socials = () => {
  return (
    <div className='absolute bottom-0 right-0 flex flex-col z-[20] rounded-lg bg-[#ffffff06] p-3 m-3'>
        <Link href="https://www.linkedin.com/in/vitalik-vakulenko/"><FaLinkedin className="hover:fill-[#d9d9d9b7] transition" size={30} /></Link>
        <Link href="https://github.com/vakulenko10"><FaGithub className="hover:fill-[#d9d9d9b7] transition" size={30}/></Link>
    </div>
  )
}

export default Socials