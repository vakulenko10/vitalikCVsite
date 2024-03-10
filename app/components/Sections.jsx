"use client"
import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import Section from './Section';
import { SectionIndex, SectionToRenderType, sectionClasses } from './mainconsts';
import Container from './Container';
import Loader from './Loader';
function Sections() {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchContentFromDB');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        
        // Extract collection names from the keys of the JSON object
        const collectionNames = Object.keys(jsonData.data);
        setCollections(collectionNames);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!collections.length) {
    return <Container  classes={`flex justify-center items-center h-screen relative`}>
        <Loader/>
    </Container>
  }

  return (
    <ul>
      {Object.entries(SectionIndex).map(([collectionName, index]) => (
        <li key={index}>
          {/* Pass the collectionName and corresponding index as props to the Section component */}
          <Section
            collectionName={collectionName}
            index={index}
            renderType={SectionToRenderType[collectionName]}
            classes={sectionClasses[collectionName]}
          />
        </li>
      ))}
    </ul>
  );
}

export default Sections;
