"use client"
import React, { useState, useEffect } from 'react';

interface FilteredData {
  en: Record<string, Record<string, unknown>[]>;
  ua: Record<string, Record<string, unknown>[]>;
}

export const filterDataByLanguage = (data: Record<string, Record<string, unknown>[]>): FilteredData => {
  const unwantedProps = ["_id", "updatedAt", "createdAt", "__v"];
  
  const filteredData: FilteredData = {
    en: {},
    ua: {}
  };

  for (const collectionName in data) {
    filteredData.en[collectionName] = data[collectionName].map(item => {
      const filteredItem: Record<string, unknown> = {};
      for (const key in item) {
        if (!key.startsWith('ua') && !unwantedProps.includes(key)) {
          filteredItem[key] = item[key];
        }
      }
      return filteredItem;
    });

    filteredData.ua[collectionName] = data[collectionName].map(item => {
      const filteredItem: Record<string, unknown> = {};
      for (const key in item) {
        if (!key.startsWith('en') && !unwantedProps.includes(key)) {
          filteredItem[key] = item[key];
        }
      }
      return filteredItem;
    });
  }
  return filteredData;
};

function YourComponent() {
  const [data, setData] = useState<FilteredData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchContentFromDB');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const language = 'en';
        const filteredData = filterDataByLanguage(jsonData.data);
        setData(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Object.keys(data).map((collectionName, index) => (
        <div key={index}>
          <h2>{collectionName}</h2>
          <ul key={index}>
            {data[collectionName as keyof FilteredData][collectionName]?.map((item, itemIndex) => (
              <li key={itemIndex}>
                {JSON.stringify(item)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default YourComponent;



