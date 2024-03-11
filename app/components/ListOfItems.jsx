import React from 'react';

const ListOfItems = ({ sectionData , sectionName}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
    <h1 className='text-center text-white capitalize'>{sectionName}</h1>
    
      <div className='pt-[20px] gap-5 md:pt-[100px] flex w-full min-[500px]:w-4/5 md:w-3/5 items-baseline justify-center md:items-baseline md:gap-8 flex-wrap'>
      {sectionData.map((item, index) => (
        <div key={index} className='flex flex-col box-border w-[100px] items-center justify-end '> {/* Ensure each item in a list has a unique key */}
          {Object.keys(item).map((prop, ind) => (
            prop === 'imageURL' ? 
              <img key={ind} className="textw-[35px] md:w-[50px] order-1 object-cover" src={item[prop]} alt={ind} /> :
              <h3 key={ind} className='text-black order-2'>{item[prop]}</h3>
          ))}
        </div>
      ))}
      </div>
      {/* <div className=' order-1 md:order-2 justify-center items-center flex flex-col'>
      
          
      </div> */}
    </div>
  );
};

export default ListOfItems;
