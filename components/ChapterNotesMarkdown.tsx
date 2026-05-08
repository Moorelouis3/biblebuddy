"use client";

import ReactMarkdown from "react-markdown";

type ChapterNotesMarkdownProps = {
  children: string;
};

export default function ChapterNotesMarkdown({ children }: ChapterNotesMarkdownProps) {
  return (
    <div className="chapter-notes-markdown max-w-none text-gray-800">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="mb-4 mt-7 text-2xl font-black leading-tight tracking-normal text-gray-950 first:mt-0 md:text-3xl" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="mb-3 mt-8 border-b border-gray-200 pb-2 text-xl font-black leading-tight tracking-normal text-gray-950 md:text-2xl" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="mb-2 mt-6 text-lg font-extrabold leading-tight text-gray-900 md:text-xl" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="mb-4 text-[15px] leading-relaxed text-gray-800 md:text-base" {...props} />
          ),
          strong: ({ ...props }) => <strong className="font-extrabold text-gray-950" {...props} />,
          em: ({ ...props }) => <em className="italic text-gray-800" {...props} />,
          ul: ({ ...props }) => (
            <ul className="mb-5 ml-0 list-none space-y-1.5 text-[15px] leading-relaxed text-gray-800 md:text-base" {...props} />
          ),
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-6 rounded-xl border-l-4 border-amber-400 bg-amber-100/75 px-5 py-4 text-gray-950 shadow-sm [&_p]:mb-0 [&_p]:font-medium [&_p]:text-gray-950"
              {...props}
            />
          ),
          img: ({ ...props }) => (
            <img className="my-5 w-full rounded-lg object-cover shadow-sm" {...props} alt={props.alt || "Bible study image"} />
          ),
          hr: ({ ...props }) => <hr className="my-7 border-gray-200" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
