// AutoUI configuration for the portfolio site
import { type AutoUIConfig } from '@autoai-ui/autoui';
import AutoUIHighlightCard from './components/AutoUIHighlightCard';
import AutoUIPortfolioList from './components/AutoUIPortfolioList';
import AutoUIPlayBackgroundButton from './components/AutoUIPlayBackgroundButton';
import AutoUISocialLinks from './components/AutoUISocialLinks';
import AutoUIBestProjectCard from './components/AutoUIBestProjectCard';
import AutoUITechStackCard from './components/AutoUITechStackCard';
import AutoUIDifferentiatorsCard from './components/AutoUIDifferentiatorsCard';
import AutoUIHireMeForm from './components/AutoUIHireMeForm';
import AutoUIProblemsExciteCard from './components/AutoUIProblemsExciteCard';
import AutoUIPortfolioPDFDownload from './components/AutoUIPortfolioPDFDownload';
import AutoUIContactForm from './components/AutoUIContactForm';
import {
  generateHighlightContent,
  fetchPortfolioItems,
  filterPortfolioItemsByQuery,
  fetchPortfolioProjectDetailsByQuery,
  getSocialLinks,
  getBestProject,
  getTechStackAndGoals,
  getWhatMakesMeDifferent,
  getProblemsThatExciteMe,
  getSiteLanguage,
  toggleSiteLanguage,
} from './autouiFunctions';

// Deprecated demo state and helper functions were removed to keep AutoUI focused
// on a single, rich highlight card experience inside the chat.

const proxyUrl = process.env.NEXT_PUBLIC_AUTOUI_PROXY_URL || '';
const sharedSecret = process.env.NEXT_PUBLIC_AUTOUI_SHARED_SECRET || '';

const autouiConfig: AutoUIConfig = {
  appId: 'app_1772479552034_wp9b4mk',
  metadata: {
    appName: 'Portfolio Site – Chat Highlight',
    appVersion: '0.1.0',
    author: 'Portfolio Owner',
    createdAt: new Date().toISOString(),
    description:
      'Portfolio website exposing a single, highly-designed highlight card component and one helper function to the AutoUI assistant. Use them to visually summarise projects, skills, or experience directly inside the chat.',
    tags: ['portfolio', 'highlight-card', 'chat-ui', 'react', 'nextjs'],
  },
  llm: {
    proxyUrl,
    sharedSecret,
    appDescriptionPrompt:
      'You are the AI assistant for Vitalik Vakulenko\'s portfolio. Call getSiteLanguage() to get the current website language and respond in that language. Use each function and component as described in their prompts.',
    temperature: 0.2,
    maxTokens: 1500,
  },
  runtime: {
    validateLLMOutput: true,
    storeChatToLocalStorage: true,
    localStorageKey: 'autoui_portfolio_chat',
    enableDebugLogs: false,
    maxSteps: 15,
    errorHandling: {
      showToUser: true,
      retryOnFail: false,
    },
  },
  functions: {
    fetchPortfolioItems: {
      prompt:
        'Fetch the list of portfolio projects from the database. Takes no parameters. Returns an array of items with id, title, description, imageURL, projectURL, gitHubRepoURL. Always call this first when the user wants to see portfolio projects, then pass the result to AutoUIPortfolioList as the "items" prop.',
      callFunc: fetchPortfolioItems,
      canShareDataWithLLM: true,
    },
    filterPortfolioItemsByQuery: {
      prompt:
        'Filter portfolio projects by a natural-language query, for example "AI", "typescript", "Next.js". Use this when the user asks for a specific kind of project. It returns only items whose title, description, or tags match the query. After calling this, render AutoUIPortfolioList with the returned items.',
      callFunc: filterPortfolioItemsByQuery,
      canShareDataWithLLM: true,
    },
    fetchPortfolioProjectDetailsByQuery: {
      prompt:
        'Fetch rich details for the portfolio project that best matches a natural-language query. Returns title, short description, and long markdown content from the project-descriptions collection. Use this when the user asks questions like "how does this website relate to AI?" or "explain this project in more depth". Use the returned detailsMarkdown and description to answer in text, and optionally render AutoUIHighlightCard using the same title/description/tags.',
      callFunc: fetchPortfolioProjectDetailsByQuery,
      canShareDataWithLLM: true,
    },
    generateHighlightContent: {
      prompt:
        'Generate tailored text and metadata for a portfolio highlight card based on the current conversation context. Use this before rendering the AutoUIHighlightCard component so that the card content feels personal and relevant.',
      callFunc: generateHighlightContent,
      canShareDataWithLLM: true,
    },
    getSocialLinks: {
      prompt: 'Returns Vitalik\'s social links: github, linkedin, phone. Use when you want to mention exact URLs in text. AutoUISocialLinks does not need props and will always show the correct profiles.',
      callFunc: getSocialLinks,
      canShareDataWithLLM: true,
    },
    getBestProject: {
      prompt: 'Returns structured data about the best project (AutoUI NPM library with 3 friends, university project). Use when asked about best project or what Vitalik is proud of. Then render AutoUIBestProjectCard with the result.',
      callFunc: getBestProject,
      canShareDataWithLLM: true,
    },
    getTechStackAndGoals: {
      prompt: 'Returns tech stack (JavaScript, TypeScript, React, Next.js), interests, OOP note, openness, DevOps note. Use when asked about tech stack or future goals. Then render AutoUITechStackCard with the result.',
      callFunc: getTechStackAndGoals,
      canShareDataWithLLM: true,
    },
    getWhatMakesMeDifferent: {
      prompt: 'Returns points that make Vitalik different from other developers. Use when asked "what makes you/me different". Then render AutoUIDifferentiatorsCard with { points }.',
      callFunc: getWhatMakesMeDifferent,
      canShareDataWithLLM: true,
    },
    getProblemsThatExciteMe: {
      prompt: 'Returns intro, points, and optional quote about problems that excite Vitalik (growth, weak sides, learning). Use when asked what kind of problems excite him. Then render AutoUIProblemsExciteCard with the result.',
      callFunc: getProblemsThatExciteMe,
      canShareDataWithLLM: true,
    },
    getSiteLanguage: {
      prompt:
        'Returns the current website language from the site context: { language: "en"|"ua"|"pl", label: "English"|"Ukrainian"|"Polish" }. Call at conversation start and when greeting; say "The current website language is [label]." using the returned label. Respond in that language (en=English, ua=Ukrainian, pl=Polish).',
      callFunc: getSiteLanguage,
      canShareDataWithLLM: true,
    },
    toggleSiteLanguage: {
      prompt:
        'Toggle the language of the main website. When user asks to switch language (e.g. to Ukrainian, Polish, English), call toggleSiteLanguage({ targetLanguage: "ua" | "pl" | "en" }). If they just say "toggle language", call it with no params to cycle. This only affects the site content, not your own language.',
      callFunc: toggleSiteLanguage,
      canShareDataWithLLM: true,
    },
  },
  components: {
    AutoUIPortfolioList: {
      prompt:
        'Displays a list of portfolio projects in the site style. Requires "items" (array from fetchPortfolioItems()). Optional "title" for the section heading. Always use items from fetchPortfolioItems()—call that function first, assign result, then pass as items.',
      callComponent: AutoUIPortfolioList,
      category: 'display',
      exampleUsage:
        '<AutoUIPortfolioList items={itemsFromFetchPortfolioItems} title="My projects" />',
    },
    AutoUIHighlightCard: {
      prompt:
        'A single, beautiful highlight card for one project or topic. Pass "title" (main heading). Optional: subtitle, description, tags, linkLabel, linkHref, imageURL.',
      callComponent: AutoUIHighlightCard,
      category: 'display',
      exampleUsage:
        '<AutoUIHighlightCard title="AI integration" description="..." tags={["AI"]} />',
    },
    AutoUISocialLinks: {
      prompt: 'Beautiful card with links to GitHub, LinkedIn, and phone. It takes no props; it always uses Vitalik\'s real profiles from the site. Use it when the user asks for social medias or contact links.',
      callComponent: AutoUISocialLinks,
      category: 'display',
      exampleUsage: '<AutoUISocialLinks />',
    },
    AutoUIBestProjectCard: {
      prompt: 'Card about the best project (AutoUI). Pass: title, subtitle, description, points (string[]), tags (string[]), optional npmUrl, repoUrl. Get data from getBestProject().',
      callComponent: AutoUIBestProjectCard,
      category: 'display',
      exampleUsage: '<AutoUIBestProjectCard {...getBestProject()} />',
    },
    AutoUITechStackCard: {
      prompt: 'Card for tech stack and future goals. Pass: techStack, interests, oopNote, openTo, devOpsNote. Get data from getTechStackAndGoals().',
      callComponent: AutoUITechStackCard,
      category: 'display',
      exampleUsage: '<AutoUITechStackCard {...getTechStackAndGoals()} />',
    },
    AutoUIDifferentiatorsCard: {
      prompt: 'Card "what makes Vitalik different". Pass: points (string[]). Get data from getWhatMakesMeDifferent().',
      callComponent: AutoUIDifferentiatorsCard,
      category: 'display',
      exampleUsage: '<AutoUIDifferentiatorsCard points={getWhatMakesMeDifferent().points} />',
    },
    AutoUIHireMeForm: {
      prompt: 'Form for "why hire me for your company": user enters company name (required) and optional description. On submit it sends a message to the AI to get a tailored answer. Optional prop: title.',
      callComponent: AutoUIHireMeForm,
      category: 'input',
      exampleUsage: '<AutoUIHireMeForm />',
    },
    AutoUIProblemsExciteCard: {
      prompt: 'Card about problems that excite Vitalik. Pass: intro, points (string[]), optional quote. Get data from getProblemsThatExciteMe().',
      callComponent: AutoUIProblemsExciteCard,
      category: 'display',
      exampleUsage: '<AutoUIProblemsExciteCard {...getProblemsThatExciteMe()} />',
    },
    AutoUIPlayBackgroundButton: {
      prompt: 'Button that when clicked plays the whole site background stripe animation for 10 seconds. Use when user asks to play or animate the site background.',
      callComponent: AutoUIPlayBackgroundButton,
      category: 'display',
      exampleUsage: '<AutoUIPlayBackgroundButton />',
    },
    AutoUIPortfolioPDFDownload: {
      prompt: 'Card with a button to download or open Vitalik\'s portfolio PDF (CV). Use when the user asks for the portfolio PDF, CV, resume, or to download/install the portfolio. No props required; the PDF path is fixed.',
      callComponent: AutoUIPortfolioPDFDownload,
      category: 'display',
      exampleUsage: '<AutoUIPortfolioPDFDownload />',
    },
    AutoUIContactForm: {
      prompt: 'Contact form that sends a message to Vitalik\'s email. User fills: name, LinkedIn, email, phone, other contacts, and message (max 1000 chars). On submit the email is sent to vakulenkoforwork@gmail.com. Use when the user wants to contact Vitalik, reach out, send a message, or get in touch. Optional prop: title.',
      callComponent: AutoUIContactForm,
      category: 'input',
      exampleUsage: '<AutoUIContactForm /> or <AutoUIContactForm title="Get in touch" />',
    },
  },
};

export const baseAutouiConfig = autouiConfig;
export default autouiConfig;
