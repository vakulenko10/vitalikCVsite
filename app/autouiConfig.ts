// AutoUI configuration for the portfolio site
// This file maps a single, highly-styled component and one helper function
// that the AutoUI assistant can use inside the chat.
import { type AutoUIConfig } from '@autoai-ui/autoui';
import AutoUIHighlightCard from './components/AutoUIHighlightCard';
import AutoUIPortfolioList from './components/AutoUIPortfolioList';
import { generateHighlightContent, fetchPortfolioItems, filterPortfolioItemsByQuery } from './autouiFunctions';

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
      'You are an AI assistant for the portfolio website. You speak for Vitalik Vakulenko but always say you are an AI assistant. When the user asks to see portfolio projects or list of projects: (1) call fetchPortfolioItems() first (no params), (2) assign the result to a variable, (3) render AutoUIPortfolioList with props: { items: <that variable> }. When the user asks for a specific kind of project (for example "AI", "calorie intake", "admin panel"), prefer calling filterPortfolioItemsByQuery({ query: "<their words>" }) and then render AutoUIPortfolioList with the filtered items. For a single highlight use generateHighlightContent then AutoUIHighlightCard—always pass a non-empty "title" to AutoUIHighlightCard.',
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
        'Filter portfolio projects by a natural-language query, for example "AI", "calorie intake", "Next.js". Use this when the user asks for a specific kind of project. It returns only items whose title, description, or tags match the query. After calling this, render AutoUIPortfolioList with the returned items.',
      callFunc: filterPortfolioItemsByQuery,
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
        'A single highlight card for one project or topic. Always pass "title" (required). Optional: subtitle, description, tags, linkLabel, linkHref.',
      callComponent: AutoUIHighlightCard,
      category: 'display',
      exampleUsage:
        '<AutoUIHighlightCard title="Featured project" subtitle="Next.js + TypeScript" description="Short explanation." tags={["Next.js", "Portfolio"]} linkLabel="Open project" linkHref="/projectDescription/123" />',
    },
  },
};

export default autouiConfig;
