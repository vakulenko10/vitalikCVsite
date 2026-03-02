// AutoUI configuration for the portfolio site
// This file maps a single, highly-styled component and one helper function
// that the AutoUI assistant can use inside the chat.
import { type AutoUIConfig } from '@autoai-ui/autoui';
import AutoUIHighlightCard from './components/AutoUIHighlightCard';
import AutoUIPortfolioList from './components/AutoUIPortfolioList';
import { generateHighlightContent, fetchPortfolioItems, filterPortfolioItemsByQuery, fetchPortfolioProjectDetailsByQuery } from './autouiFunctions';

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
      'You are an AI assistant for the portfolio website. You speak for Vitalik Vakulenko but always say you are an AI assistant. When the user asks to see portfolio projects or list of projects: (1) call fetchPortfolioItems() first (no params), (2) assign the result to a variable, (3) render AutoUIPortfolioList with props: { items: <that variable> }. When the user asks for a specific kind of project (for example "AI", "calorie intake", "admin panel"), prefer calling filterPortfolioItemsByQuery({ query: "<their words>" }) and then render AutoUIPortfolioList with the filtered items. When the user asks detailed questions about how a specific project relates to AI or how it works, first call fetchPortfolioProjectDetailsByQuery({ query: "<their words>" }) and use the returned detailsMarkdown + description to write a direct natural-language answer, then optionally render AutoUIHighlightCard for that project. Always include a clear textual answer, not only UI components. For a generic single highlight you can still use generateHighlightContent then AutoUIHighlightCard—always pass a non-empty "title" to AutoUIHighlightCard.',
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
        'A single, beautiful highlight card for one project or topic. Pass "title" (main heading). Optional: subtitle, description, tags (e.g. ["AI", "Next.js"]), linkLabel, linkHref (e.g. /projectDescription/<id>), imageURL (project thumbnail). Use for focused, data-rich highlights.',
      callComponent: AutoUIHighlightCard,
      category: 'display',
      exampleUsage:
        '<AutoUIHighlightCard title="AI integration in SMM Website" subtitle="Custom tool for AI chat" description="Explaining the connection between AI and social media management." tags={["AI", "Portfolio"]} linkLabel="View project" linkHref="/projectDescription/abc123" imageURL="https://..." />',
    },
  },
};

export default autouiConfig;
