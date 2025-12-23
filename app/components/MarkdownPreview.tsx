"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

const MarkdownPreview = ({ content, className = "" }: MarkdownPreviewProps) => {
  if (!content || content.trim() === "") {
    return (
      <div className={`text-black italic ${className}`}>
        No content to display
      </div>
    );
  }

  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-black mb-4 mt-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold text-black mb-3 mt-5" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold text-black mb-2 mt-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 text-black leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-black" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-black" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-[#A5DD9B] hover:text-[#C5EBAA] underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img
              className="rounded-lg shadow-md my-4 max-w-full h-auto"
              {...props}
            />
          ),
          code: ({ node, inline, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-[#F6F193] text-black px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                />
              );
            }
            return (
              <code
                className="block bg-[#F6F193] text-black p-4 rounded-lg overflow-x-auto text-sm font-mono my-4"
                {...props}
              />
            );
          },
          pre: ({ node, ...props }) => (
            <pre className="bg-[#F6F193] p-4 rounded-lg overflow-x-auto my-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-[#A5DD9B] pl-4 italic text-black my-4"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-[#A5DD9B]" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;

