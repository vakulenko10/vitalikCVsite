import Link from 'next/link';
import Container from './Container';
import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-[#A5DD9B]'>
      <Container>
        <div className='flex flex-col md:flex-row py-5 px-3 justify-between items-center '>
          <div className='links flex flex-row'>
            <Link title='linkedin' href="https://www.linkedin.com/in/vitalik-vakulenko/">
              <FaLinkedin className=" fill-[#3e3e3e] hover:fill-[#686868b7] transition" size={30} />
            </Link>
            <Link title='github' href="https://github.com/vakulenko10">
              <FaGithub className="fill-[#3e3e3e]  hover:fill-[#686868b7] transition" size={30} />
            </Link>
          </div>
          <div className='text-center md:text-end'>
            <h5>that is an attachment to CV</h5>
            <h6>made by Vitalik Vakulenko </h6>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;




