"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MarkdownPreview from "@/app/components/MarkdownPreview";
import Link from "next/link";
import { useLanguage } from "@/app/components/LanguageContext";

interface ProjectDescription {
  _id: string;
  portfolioItemId: string;
  enMarkdownContent?: string;
  uaMarkdownContent?: string;
  plMarkdownContent?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ProjectDescriptionPage = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;
  const { language } = useLanguage();
  
  const [projectDescription, setProjectDescription] = useState<ProjectDescription | null>(null);
  const [portfolioItem, setPortfolioItem] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) {
        setError("Project ID is missing");
        setLoading(false);
        return;
      }

      try {
        // Fetch project description (only once per projectId - contains all languages)
        const descriptionResponse = await fetch(
          `/api/project-descriptions/portfolio/${projectId}`
        );
        
        const descriptionData = await descriptionResponse.json();

        if (descriptionData.success && descriptionData.data) {
          setProjectDescription(descriptionData.data);
        }

        // Fetch portfolio item details (only once per projectId - contains all languages)
        const portfolioResponse = await fetch(`/api/fetchContentFromDB/myportfolioitems`);
        const portfolioData = await portfolioResponse.json();
        
        if (portfolioData.documents) {
          const item = portfolioData.documents.find(
            (doc: Record<string, unknown>) => doc._id === projectId
          );
          if (item) {
            setPortfolioItem(item);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to load project description");
        setLoading(false);
      }
    };

    fetchData();
    // Only re-fetch when projectId changes, not when language changes
    // Language changes will automatically update the display via getMarkdownContent()
  }, [projectId]);

  // Get markdown content for current language with fallback
  const getMarkdownContent = (): string => {
    if (!projectDescription) return '';
    
    // Try current language first, then fallback chain: en -> ua -> pl
    switch (language) {
      case 'en':
        return projectDescription.enMarkdownContent || 
               projectDescription.uaMarkdownContent || 
               projectDescription.plMarkdownContent || 
               '';
      case 'ua':
        return projectDescription.uaMarkdownContent || 
               projectDescription.enMarkdownContent || 
               projectDescription.plMarkdownContent || 
               '';
      case 'pl':
        return projectDescription.plMarkdownContent || 
               projectDescription.enMarkdownContent || 
               projectDescription.uaMarkdownContent || 
               '';
      default:
        return projectDescription.enMarkdownContent || 
               projectDescription.uaMarkdownContent || 
               projectDescription.plMarkdownContent || 
               '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#C5EBAA] relative">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className='h-[10%]   w-full bg-[#C5EBAA]'></div>
          <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
          <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading project description...</p>
        </div>
      </div>
    );
  }

  // Check if description exists and has content in any language
  const hasDescription = projectDescription && (
    projectDescription.enMarkdownContent || 
    projectDescription.uaMarkdownContent || 
    projectDescription.plMarkdownContent
  );

  if (error || !hasDescription) {
    return (
      <div className="min-h-screen pt-12 flex items-center justify-center bg-[#C5EBAA] relative px-4">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className='h-[10%]   w-full bg-[#C5EBAA]'></div>
          <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
          <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
          <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
        </div>
        <div className="text-center max-w-md relative z-10">
          <div className="mb-6">
            <img
              src="https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif"
              alt="No description found"
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Oops! No Description Found
          </h1>
          <p className="text-white mb-6">
            This project doesn't have a description yet. Check back later or explore other projects!
          </p>
          <Link
            href="/#myPortfolio"
            className="inline-block bg-[#F2C18D] text-white px-6 py-3 rounded-lg hover:bg-[#C5EBAA] transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#C5EBAA] relative py-8">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className='h-[10%] w-full bg-[#F6F193]'></div>
        <div className='h-[10%]  w-full bg-[#F6F193]'></div>
        <div className='h-[10%]  w-full bg-[#F6F193]'></div>
        <div className='h-[10%]   w-full bg-[#C5EBAA]'></div>
        <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
        <div className='h-[10%]  w-full bg-[#C5EBAA]'></div>
        <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
        <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
        <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
        <div className='h-[10%]  w-full bg-[#A5DD9B]'></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/#myPortfolio"
            className="inline-flex items-center text-white hover:text-[#F6F193] mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Portfolio
          </Link>
          
          {portfolioItem && (
            <div className="bg-white backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-3xl font-bold text-black mb-2">
                {String(
                  (language === 'en' && portfolioItem["enTitle"]) ||
                  (language === 'ua' && portfolioItem["uaTitle"]) ||
                  (language === 'pl' && portfolioItem["plTitle"]) ||
                  portfolioItem["enTitle"] ||
                  portfolioItem["uaTitle"] ||
                  portfolioItem["plTitle"] ||
                  "Project"
                )}
              </h1>
              {(portfolioItem["enDescription"] || portfolioItem["uaDescription"] || portfolioItem["plDescription"]) ? (
                <p className="text-black text-lg">
                  {String(
                    (language === 'en' && portfolioItem["enDescription"]) ||
                    (language === 'ua' && portfolioItem["uaDescription"]) ||
                    (language === 'pl' && portfolioItem["plDescription"]) ||
                    portfolioItem["enDescription"] ||
                    portfolioItem["uaDescription"] ||
                    portfolioItem["plDescription"] ||
                    ""
                  )}
                </p>
              ) : null}
            </div>
          )}
        </div>

        {/* Project Description Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <MarkdownPreview content={getMarkdownContent()} />
        </div>

        {/* Footer with project links if available */}
        {portfolioItem && (
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {portfolioItem["projectURL"] && String(portfolioItem["projectURL"]).trim() !== "" ? (
              <a
                href={String(portfolioItem["projectURL"])}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F2C18D] text-white px-6 py-3 rounded-lg hover:bg-[#C5EBAA] transition-colors inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Project
              </a>
            ) : null}
            {portfolioItem["gitHubRepoURL"] && String(portfolioItem["gitHubRepoURL"]).trim() !== "" ? (
              <a
                href={String(portfolioItem["gitHubRepoURL"])}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#A5DD9B] text-white px-6 py-3 rounded-lg hover:bg-[#C5EBAA] transition-colors inline-flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDescriptionPage;

