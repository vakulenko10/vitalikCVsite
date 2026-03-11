"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { renderTextByProperty } from "./mainconsts";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFileText } from "react-icons/bs";

interface GalleryProps {
  sectionData?: Record<string, unknown>[];
  sectionName?: string;
}

const Gallery = ({ sectionData = [], sectionName = "items" }: GalleryProps) => {
  if (!Array.isArray(sectionData) || sectionData.length === 0) {
    return null;
  }
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div className="py-6 sm:py-8 md:py-10">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 w-full max-w-6xl mx-auto"
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {sectionData.map((sectionItem, index) => {
          const projectURL =
            typeof sectionItem["projectURL"] === "string"
              ? String(sectionItem["projectURL"]).trim()
              : "";
          const gitHubURL =
            typeof sectionItem["gitHubRepoURL"] === "string"
              ? String(sectionItem["gitHubRepoURL"]).trim()
              : "";
          const detailsId =
            typeof sectionItem["_id"] === "string"
              ? String(sectionItem["_id"]).trim()
              : "";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden aspect-video sm:aspect-[4/3] bg-gray-100">
                <img
                  src={String(sectionItem["imageURL"] || "")}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 gap-3 sm:gap-4 p-4">
                  {projectURL && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={projectURL}
                    className="bg-white/20 hover:bg-white/90 hover:text-gray-900 rounded-full p-3 sm:p-3.5 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="View Project"
                  >
                    <BsFillEyeFill className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                  )}
                  {gitHubURL && (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={gitHubURL}
                    className="bg-white/20 hover:bg-white/90 hover:text-gray-900 rounded-full p-3 sm:p-3.5 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="GitHub"
                  >
                    <FaGithub className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                  )}
                  {detailsId && (
                  <Link
                    href={`/projectDescription/${detailsId}`}
                    className="bg-white/20 hover:bg-white/90 hover:text-gray-900 rounded-full p-3 sm:p-3.5 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="Details"
                  >
                    <BsFileText className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-5 flex-1 flex flex-col min-w-0 text-center">
                {Object.keys(sectionItem).map((prop, idx) => {
                  if (prop !== "imageURL" && prop !== "_id" && !prop.includes("URL")) {
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
          );
        })}
      </motion.div>
    </div>
  );
};

export default Gallery;

