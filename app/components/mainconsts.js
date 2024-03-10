import Link from "next/link";

export const SectionIndex = {
    "helloitems": 0,
    "aboutmeitems":1,
    "myportfolioitems": 2,
    "mynewsitems": 3
}
export const collectionsToSections = {
    "helloitems": "welcome",
    "aboutmeitems":"about",
    "myportfolioitems":"Portfolio",
    "mynewsitems":"someNews"
}
export const Sections = Object.values(collectionsToSections);
export const sectionClasses = {
    "helloitems": ` md:h-[100vh] bg-slate-500 pb-[10px] md:pb-0  bg-cover pt-[50px] md:pt-0 `,
    "myportfolioitems": 'bg-slate-300',
    "aboutmeitems": 'md:h-[100vh] bg-slate-400 py-[10px] ',
    "mynewsitems": 'md:h-[100vh] bg-slate-200 py-[10px] text-black'
  
  }

export const SectionToRenderType = {
    "helloitems": "default",
    "aboutmeitems":"carousel",
    "myportfolioitems":"gallery",
    "mynewsitems":"carousel"
}
export function renderTextByProperty(property, text, key, className) {
    if (property.includes('Title')) {
      return <h1 className={`${className}`} key={key}>{text}</h1>;
    } else if (property.includes('Description')) {
      return <h4 className={`${className}`} key={key}>{text}</h4>;
    }
    else if (property.includes('Welcome')) {
      return <h2 className={`${className}`} key={key}>{text}</h2>;
    }
    else if (property.includes('Question')) {
      return <h5 className={`${className}`} key={key}>{text}</h5>;
    }
    else if (property.includes('Answer')) {
      return <p className={`${className}`} key={key}>{text}</p>;
    }
    else if (property.includes('imageDate')) {
      return <h5 className={`${className}`} key={key}>{text}</h5>;
    }
    // Add more cases for other substrings or conditions as needed
    return <p className={`${className}`} key={key}>{text}</p>;
  }