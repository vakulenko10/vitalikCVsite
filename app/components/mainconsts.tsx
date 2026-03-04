import Link from "next/link";
import { ReactElement } from "react";

export const SectionIndex: Record<string, number> = {
    "helloitems": 0,
    "aboutmeitems": 1,
    "myportfolioitems": 2,
    "skillitems": 3,
    "mynewsitems": 4
};

export const collectionsToSections: Record<string, string> = {
    "helloitems": "welcome",
    "aboutmeitems": "about",
    "myportfolioitems": "Portfolio",
    "skillitems": 'skills',
    "mynewsitems": "someNews",
};

export const Sections = Object.values(collectionsToSections);

export const sectionClasses: Record<string, string> = {
    "helloitems": ` min-h-[100dvh] bg-[#F2C18D] bg-center pb-0 bg-cover pb-[env(safe-area-inset-bottom)] `,
    "myportfolioitems": 'bg-[#C5EBAA] relative min-h-[100dvh] md:min-h-[100vh] pb-[env(safe-area-inset-bottom)]',
    "aboutmeitems": ' relative min-h-[100dvh] h-[100dvh] md:min-h-[100vh] md:h-[100vh] py-[10px] pb-[env(safe-area-inset-bottom)] ',
    "skillitems": ' bg-[#C5EBAA] min-h-[100dvh] md:min-h-[100vh] relative pb-[env(safe-area-inset-bottom)]',
    "mynewsitems": 'relative min-h-[100dvh] h-[100dvh] md:min-h-[100vh] md:h-[100vh] bg-[#C5EBAA] py-[10px] text-black pb-[env(safe-area-inset-bottom)]',
};

export const SectionToRenderType: Record<string, string> = {
    "helloitems": "default",
    "aboutmeitems": "carousel",
    "myportfolioitems": "gallery",
    "mynewsitems": "carousel",
    "skillitems": "list"
};

interface RenderTextProps {
    property: string;
    text: string;
    key: string | number;
    className?: string;
}

export function renderTextByProperty(property: string, text: string, key: string | number, className: string = ""): ReactElement {
    if (property.includes('Title')) {
        return <h1 className={`${className} `} key={key}>{text}</h1>;
    } else if (property.includes('Description')) {
        return <h4 className={`${className}`} key={key}>{text}</h4>;
    } else if (property.includes('Welcome')) {
        return <h2 className={`${className}`} key={key}>{text}</h2>;
    } else if (property.includes('Question')) {
        return <h5 className={`${className}`} key={key}>{text}</h5>;
    } else if (property.includes('Answer')) {
        return <p className={`${className}`} key={key}>{text}</p>;
    } else if (property.includes('imageDate')) {
        return <h5 className={`${className}`} key={key}>{text}</h5>;
    }
    // Add more cases for other substrings or conditions as needed
    return <p className={`${className}`} key={key}>{text}</p>;
}




