"use client"
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import Container from './Container';
import DefaultRenderComponent from './DefaultRenderComponent';
import Carousel from './Carousel';
import Gallery from './Gallery';
import Accordion from './Accordion';
import ListOfItems from './ListOfItems'
import { SectionToRenderType, Sections, collectionsToSections, sectionClasses } from './mainconsts';
import Loader from './Loader'
import Socials from './Socials'

const filterDataByLanguage = (collectionData, language) => {
  const unwantedProps = ["_id", "updatedAt", "createdAt", "__v"];

  return collectionData.map(item => {
    var filteredItems = {};
    for (const key in item) {
      if ( ((!key.startsWith('ua') && !key.startsWith('pl')) && (language === 'en' )) || ((!key.startsWith('en') && !key.startsWith('pl')) && language === 'ua') || ((!key.startsWith('en') && !key.startsWith('ua')) && language === 'pl')) {
        if (!unwantedProps.includes(key)) {
          filteredItems[key] = item[key];
        }
      }
    }
    console.log("filteredItems: ",filteredItems)
    return filteredItems;
  });
};



const Section = ({ collectionName, renderType, className, backgroundItem}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/fetchContentFromDB/${collectionName}`);
        console.log("response: ", response)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json(); 
        console.log("jsonData: ",jsonData)
        const filteredData = filterDataByLanguage(jsonData.documents, language);
        setData(filteredData);
        setLoading(false)
        
      } catch (error) {
        setError(error.message);
      }
    }
  
    fetchData();
  }, [language, collectionName]);
  const RenderTypeToComponent = (renderType, data) => {
    if (!data || !data.length) {
      return null; // Return null if sectionData is empty or null
    }
  
      switch (renderType) {
        case "default":
          return <DefaultRenderComponent sectionData={data} />;
        case "carousel":
          return <Carousel sectionData={data} sectionName={collectionsToSections[collectionName]} />;
        case "gallery":
          return <Gallery sectionData={data} sectionName={collectionsToSections[collectionName]} />;
        case "accordion":
          return <Accordion sectionData={data} sectionName={collectionsToSections[collectionName]} />;
        case "list":
          return <ListOfItems sectionData={data} sectionName={collectionsToSections[collectionName]} />;
        default:
          return null;
      }
    
  };
  console.log("data:", data)
  if(loading){
    
    return(
      <div id={collectionsToSections[collectionName]} className={`${collectionsToSections[collectionName]} section w-full h-[100vh] overflow-hidden box-border ${className} ${sectionClasses[collectionName]}`}>
        <Container classes={`flex justify-center items-center h-full relative  `}>
        <Loader />
        </Container>
      </div>
    )
  }
  else{
    return (
    <div id={collectionsToSections[collectionName]} className={`${collectionsToSections[collectionName]} min-h-[100vh] section w-full overflow-hidden box-border ${className} ${sectionClasses[collectionName]} `}>
      {backgroundItem}
      <Container >
        {/* {JSON.stringify(data)} */}
        {collectionsToSections[collectionName]!='welcome'?<h1 className='text-center capitalize text-white z-10 md:sectionTitle'>{collectionsToSections[collectionName]}</h1>:null}
        {RenderTypeToComponent(renderType, data)}
        <Socials/>
      </Container>
      
    </div>
  );}
};

export default Section;
