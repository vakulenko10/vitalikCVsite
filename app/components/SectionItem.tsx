"use client"
import React from 'react';
import { renderTextByProperty } from './mainconsts';

interface SectionItemProps {
  collectionName: string;
  item: Record<string, unknown>;
  index: number;
}

const SectionItem = ({ collectionName, item, index }: SectionItemProps) => {
  return (
    <div className={`flex flex-col`}>
      {Object.keys(item).map((itemProperty, indexProp) => (
        <div key={indexProp}>
          {itemProperty === 'imageURL' ? (
            <img
              className={`w-[400px] h-auto`}
              src={String(item[itemProperty] || "")}
              alt={itemProperty}
            />
          ) : (
            renderTextByProperty(itemProperty, String(item[itemProperty] || ""), indexProp)
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionItem;

