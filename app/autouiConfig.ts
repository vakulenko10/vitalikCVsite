// AutoUI configuration for the portfolio site
// This file maps app components and simple runtime functions for AutoUI assistant
import { type AutoUIConfig } from '@autoai-ui/autoui';
import Accordion from './components/Accordion';
import Carousel from './components/Carousel';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Footer from './components/Footer';
import ListOfItems from './components/ListOfItems';
import Sections from './components/Sections';
import Container from './components/Container';
import MarkdownPreview from './components/MarkdownPreview';
import LinksContainer from './components/LinksContainer';
import WelcomeContent from './components/WelcomeContent';
import Socials from './components/Socials';

// Lightweight helper state for demo functions
let portfolioItems: any[] = [];

function createPortfolioItem(draft: any) {
  const item = { ...draft, id: Date.now().toString(), created_at: new Date().toISOString() };
  portfolioItems.push(item);
  return item;
}

function updatePortfolioItem(id: string, patch: any) {
  const idx = portfolioItems.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  portfolioItems[idx] = { ...portfolioItems[idx], ...patch };
  return portfolioItems[idx];
}

function deletePortfolioItem(id: string) {
  const before = portfolioItems.length;
  portfolioItems = portfolioItems.filter((p) => p.id !== id);
  return before - portfolioItems.length;
}

function fetchPortfolioItems() {
  return portfolioItems;
}

function openPortfolioForm() {
  // Minimal UI action: try to focus an element by id if present
  if (typeof window !== 'undefined') {
    const el = document.getElementById('portfolio-form');
    if (el) (el as HTMLElement).focus();
  }
  return true;
}

const proxyUrl = process.env.NEXT_PUBLIC_AUTOUI_PROXY_URL || '';
const sharedSecret = process.env.NEXT_PUBLIC_AUTOUI_SHARED_SECRET || '';

const autouiConfig: AutoUIConfig = {
  appId: 'app_1772465748015_sw9niwa',
  metadata: {
    appName: 'Portfolio Site',
    appVersion: '0.1.0',
    author: 'Portfolio Owner',
    createdAt: new Date().toISOString(),
    description:
      'Portfolio website exposing components and helper functions to the AutoUI assistant. Use the provided components to show projects, galleries, and content editors.',
    tags: ['portfolio', 'gallery', 'projects', 'react', 'nextjs'],
  },
  llm: {
    proxyUrl,
    sharedSecret,
    appDescriptionPrompt: 'A portfolio web site with projects, gallery, and content sections. Assist users by opening UI components and manipulating project items when requested.',
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
    createPortfolioItem: {
      prompt: 'Create a new portfolio item by providing required fields; add id and created_at timestamp.',
      callFunc: createPortfolioItem,
    },
    updatePortfolioItem: {
      prompt: 'Update an existing portfolio item by ID using a patch object.',
      callFunc: updatePortfolioItem,
    },
    deletePortfolioItem: {
      prompt: 'Delete a portfolio item by ID and return the number of removed items.',
      callFunc: deletePortfolioItem,
    },
    fetchPortfolioItems: {
      prompt: 'Return the current list of portfolio items maintained in the app runtime.',
      callFunc: fetchPortfolioItems,
      canShareDataWithLLM: true,
    },
    openPortfolioForm: {
      prompt: 'Open or focus the portfolio item creation form on the page for the user to input data.',
      callFunc: openPortfolioForm,
    },
  },
  components: {
    Header: {
      prompt: 'Site header with navigation and branding.',
      callComponent: Header,
      category: 'layout',
      exampleUsage: '<Header />',
    },
    Footer: {
      prompt: 'Site footer with socials and links.',
      callComponent: Footer,
      category: 'layout',
      exampleUsage: '<Footer />',
    },
    Accordion: {
      prompt: 'Accordion for FAQ or question/answer content.',
      callComponent: Accordion,
      category: 'layout',
      exampleUsage: '<Accordion sectionData={data} />',
    },
    Carousel: {
      prompt: 'Horizontal carousel for featured projects or images.',
      callComponent: Carousel,
      category: 'display',
      exampleUsage: '<Carousel items={items} />',
    },
    Gallery: {
      prompt: 'Image gallery component showing project screenshots.',
      callComponent: Gallery,
      category: 'display',
      exampleUsage: '<Gallery images={images} />',
    },
    Sections: {
      prompt: 'Top-level sections container used across the site.',
      callComponent: Sections,
      category: 'layout',
    },
    ListOfItems: {
      prompt: 'Generic list renderer used for project lists and links.',
      callComponent: ListOfItems,
      category: 'display',
    },
    MarkdownPreview: {
      prompt: 'Renders markdown content as HTML for previews and descriptions.',
      callComponent: MarkdownPreview,
      category: 'display',
    },
    LinksContainer: {
      prompt: 'Container for external and internal links (socials, repo, live demo).',
      callComponent: LinksContainer,
      category: 'utility',
    },
    WelcomeContent: {
      prompt: 'Hero / welcome content section.',
      callComponent: WelcomeContent,
      category: 'layout',
    },
    Socials: {
      prompt: 'Social links and icons.',
      callComponent: Socials,
      category: 'utility',
    },
    Container: {
      prompt: 'Layout container used for consistent padding and centering.',
      callComponent: Container,
      category: 'layout',
    },
  },
};

export default autouiConfig;
