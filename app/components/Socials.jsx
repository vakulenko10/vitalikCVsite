import Link from 'next/link'
import React from 'react'


import { FaLinkedin, FaGithub  } from "react-icons/fa";
const Socials = () => {
  return (
    <div className='absolute bottom-0 right-0 flex flex-col z-[20] rounded-lg bg-[#ffffff06] p-3 m-3'>
        <Link href=""><FaLinkedin className="hover:fill-[#5b5b5bb7] transition" size={30} /></Link>
        <Link href=""><FaGithub className="hover:fill-[#5b5b5bb7] transition" size={30}/></Link>
    </div>
  )
}

export default Socials