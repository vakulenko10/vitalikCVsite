"use client"
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import Container from './Container';
import DefaultRenderComponent from './DefaultRenderComponent';
import Carousel from './Carousel';
import Gallery from './Gallery';
import Accordion from './Accordion';
import ListOfItems from './ListOfItems';
import { SectionToRenderType, Sections, collectionsToSections, sectionClasses } from './mainconsts';
import Loader from './Loader';
import Socials from './Socials';

const filterDataByLanguage = (collectionData: Record<string, unknown>[], language: string): Record<string, unknown>[] => {
  const unwantedProps = ["_id", "updatedAt", "createdAt", "__v"];

  return collectionData.map(item => {
    const filteredItems: Record<string, unknown> = {};
    // Store _id separately for navigation (not in filteredItems to avoid rendering)
    const itemId = item._id;
    
    for (const key in item) {
      if (
        ((!key.startsWith('ua') && !key.startsWith('pl')) && (language === 'en')) ||
        ((!key.startsWith('en') && !key.startsWith('pl')) && language === 'ua') ||
        ((!key.startsWith('en') && !key.startsWith('ua')) && language === 'pl')
      ) {
        if (!unwantedProps.includes(key)) {
          filteredItems[key] = item[key];
        }
      }
    }
    // Add _id back only for navigation purposes (will be filtered out in Gallery render)
    if (itemId) {
      filteredItems._id = itemId;
    }
    return filteredItems;
  });
};

interface SectionProps {
  collectionName: string;
  renderType: string;
  className?: string;
  backgroundItem?: React.ReactNode;
  index?: number;
}

const Section = ({ collectionName, renderType, className = "", backgroundItem }: SectionProps) => {
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/fetchContentFromDB/${collectionName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const filteredData = filterDataByLanguage(jsonData.documents, language);
        setData(filteredData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    }

    fetchData();
  }, [language, collectionName]);

  const RenderTypeToComponent = (renderType: string, data: Record<string, unknown>[] | null): React.ReactNode => {
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
        return <Accordion sectionData={data} />;
      case "list":
        return <ListOfItems sectionData={data} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div
        id={collectionsToSections[collectionName]}
        className={`${collectionsToSections[collectionName]} section w-full h-[100vh] overflow-y-auto box-border ${className} ${sectionClasses[collectionName]}`}
      >
        <Container classes={`flex justify-center items-center h-full relative  `}>
          <Loader />
        </Container>
      </div>
    );
  } else {
    return (
      <div
        id={collectionsToSections[collectionName]}
        className={`${collectionsToSections[collectionName]} min-h-[100vh] section w-full overflow-y-auto box-border ${className} ${sectionClasses[collectionName]} `}
      >
        {backgroundItem}
        <Container>
          {collectionsToSections[collectionName] != 'welcome' ? (
            <div className='flex justify-center items-center'>
              <h1 className='text-center  capitalize my-5 text-white z-10 md:sectionTitle'>
                {collectionsToSections[collectionName]}
              </h1>
            </div>
          ) : null}
          {RenderTypeToComponent(renderType, data)}
          <Socials />
        </Container>
      </div>
    );
  }
};

export default Section;

