"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { renderTextByProperty } from "./mainconsts";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";

interface GalleryProps {
  sectionData: Record<string, unknown>[];
  sectionName: string;
}

const Gallery = ({ sectionData, sectionName }: GalleryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div className="py-10">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto px-4 lg:px-8"
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {sectionData.map((sectionItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="group shadow-md hover:shadow-lg transition-transform bg-white p-4 rounded-lg overflow-hidden relative"
          >
            {/* Image Wrapper */}
            <div className="relative overflow-hidden rounded-lg">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-4">
                  <Link
                    target="_blank"
                    href={String(sectionItem["projectURL"] || "#")}
                    className="bg-white bg-opacity-20 hover:bg-opacity-80 rounded-full p-3 transition"
                  >
                    <BsFillEyeFill className="text-white w-6 h-6" />
                  </Link>
                  <Link
                    target="_blank"
                    href={String(sectionItem["gitHubRepoURL"] || "#")}
                    className="bg-white bg-opacity-20 hover:bg-opacity-80 rounded-full p-3 transition"
                  >
                    <FaGithub className="text-white w-6 h-6" />
                  </Link>
                </div>
              </div>
              <img
                src={String(sectionItem["imageURL"] || "")}
                alt={`${index}`}
                className="w-full h-56 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Text Content */}
            <div className="text-center pt-4">
              {Object.keys(sectionItem).map((prop, idx) => {
                if (prop !== "imageURL" && !prop.includes("URL")) {
                  return renderTextByProperty(
                    prop,
                    String(sectionItem[prop] || ""),
                    idx,
                    `text-gray-800 ${sectionName}`
                  );
                }
                return null;
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;

