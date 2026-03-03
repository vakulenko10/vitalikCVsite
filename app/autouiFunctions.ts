import { autouiRegisterFunctionParamsSchema } from "@autoai-ui/autoui";

export interface PortfolioItemForChat {
  id: string;
  title: string;
  description?: string;
  imageURL?: string;
  projectURL?: string;
  gitHubRepoURL?: string;
  tags?: string[];
}

export async function fetchPortfolioItems(): Promise<PortfolioItemForChat[]> {
  const res = await fetch("/api/fetchContentFromDB/myportfolioitems");
  if (!res.ok) return [];
  const { documents } = (await res.json()) as { documents?: Record<string, unknown>[] };
  if (!Array.isArray(documents)) return [];

  return documents.map((doc) => {
    const id = typeof doc._id === "string" ? doc._id : String(doc._id ?? "");
    const title =
      (doc.enTitle as string) ?? (doc.uaTitle as string) ?? (doc.plTitle as string) ?? "";
    const description =
      (doc.enDescription as string) ??
      (doc.uaDescription as string) ??
      (doc.plDescription as string) ??
      undefined;

    const textForTags = `${title} ${description ?? ""}`.toLowerCase();
    const tags: string[] = ["portfolio"];
    if (textForTags.includes("ai") || textForTags.includes("chatbot")) {
      tags.push("ai");
    }
    if (textForTags.includes("calorie") || textForTags.includes("nutrition")) {
      tags.push("calorie-intake");
    }

    return {
      id,
      title,
      description,
      imageURL: doc.imageURL as string | undefined,
      projectURL: doc.projectURL as string | undefined,
      gitHubRepoURL: doc.gitHubRepoURL as string | undefined,
      tags,
    };
  });
}

autouiRegisterFunctionParamsSchema(fetchPortfolioItems);

export async function filterPortfolioItemsByQuery(params: {
  /** Natural-language description like \"AI\", \"calorie intake\", etc. */ query: string;
}): Promise<PortfolioItemForChat[]> {
  const query = params.query.trim().toLowerCase();
  const items = await fetchPortfolioItems();
  if (!query) return items;

  return items.filter((item) => {
    const haystack = `${item.title} ${item.description ?? ""} ${(item.tags ?? []).join(" ")}`.toLowerCase();
    return haystack.includes(query);
  });
}

autouiRegisterFunctionParamsSchema(filterPortfolioItemsByQuery);

export interface PortfolioProjectDetailsForChat {
  id: string;
  title: string;
  description?: string;
  /** Long-form markdown description from the project-descriptions collection (any language). */
  detailsMarkdown?: string;
}

/**
 * Find the portfolio project that best matches a natural-language query (\"AI\", \"calorie intake\", etc.)
 * and return both the short description and the long markdown content.
 *
 * Use this when the user asks questions like \"how does this website relate to AI?\".
 */
export async function fetchPortfolioProjectDetailsByQuery(params: {
  query: string;
}): Promise<PortfolioProjectDetailsForChat | null> {
  const query = params.query.trim();
  const filtered = await filterPortfolioItemsByQuery({ query });
  const all = filtered.length ? filtered : await fetchPortfolioItems();
  const best = all[0];
  if (!best) return null;

  let detailsMarkdown: string | undefined;
  try {
    const res = await fetch(`/api/project-descriptions/portfolio/${best.id}`);
    if (res.ok) {
      const json = (await res.json()) as {
        success?: boolean;
        data?: {
          enMarkdownContent?: string;
          uaMarkdownContent?: string;
          plMarkdownContent?: string;
        };
      };
      const data = json.data;
      if (data) {
        detailsMarkdown =
          data.enMarkdownContent ||
          data.uaMarkdownContent ||
          data.plMarkdownContent ||
          undefined;
      }
    }
  } catch {
    // If description fetch fails, we still return basic project info.
  }

  return {
    id: best.id,
    title: best.title,
    description: best.description,
    detailsMarkdown,
  };
}

autouiRegisterFunctionParamsSchema(fetchPortfolioProjectDetailsByQuery);

type HighlightTone = "friendly" | "confident" | "detailed";

export function generateHighlightContent({
  context,
  tone = "friendly",
}: {
  context: string;
  tone?: HighlightTone;
}) {
  const baseTitle = "Portfolio insight tailored for you";

  const subtitleByTone: Record<HighlightTone, string> = {
    friendly: "A quick, human explanation of how I can help.",
    confident: "A focused snapshot of what I do best.",
    detailed: "A deeper breakdown of the most relevant details.",
  };

  const toneTagByTone: Record<HighlightTone, string> = {
    friendly: "Friendly tone",
    confident: "Confident tone",
    detailed: "Detailed breakdown",
  };

  return {
    title: baseTitle,
    subtitle: subtitleByTone[tone],
    description: context,
    tags: ["Portfolio", "Next.js", "TypeScript", toneTagByTone[tone]],
    linkLabel: "View full portfolio",
    linkHref: "/",
  };
}

autouiRegisterFunctionParamsSchema(generateHighlightContent);

// --- Predefined Q&A data (used by components / AI) ---

export interface SocialLinksData {
  github: string;
  linkedin: string;
  phone: string;
}

export function getSocialLinks(): SocialLinksData {
  return {
    github:
      typeof process !== "undefined" && process.env?.NEXT_PUBLIC_GITHUB_URL
        ? process.env.NEXT_PUBLIC_GITHUB_URL
        : "https://github.com",
    linkedin:
      typeof process !== "undefined" && process.env?.NEXT_PUBLIC_LINKEDIN_URL
        ? process.env.NEXT_PUBLIC_LINKEDIN_URL
        : "https://linkedin.com/in",
    phone:
      typeof process !== "undefined" && process.env?.NEXT_PUBLIC_PHONE
        ? process.env.NEXT_PUBLIC_PHONE
        : "+1 234 567 8900",
  };
}

autouiRegisterFunctionParamsSchema(getSocialLinks);

export interface BestProjectData {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  tags: string[];
  npmUrl?: string;
  repoUrl?: string;
}

export function getBestProject(): BestProjectData {
  return {
    title: "AutoUI — Generative UI library",
    subtitle: "NPM library built with 3 friends as a university implementation project",
    description:
      "A generative UI library published on NPM. I didn't only write core logic: I came up with the idea of building a generative UI library, planned sprints, and divided tasks for each team member. We delivered a working NPM package as our implementation project for university studies.",
    points: [
      "Originated the idea of a generative UI library and drove the project vision.",
      "Planned sprints and split tasks across the team (4 members).",
      "Implemented core logic and library architecture.",
      "Shipped as a published NPM package used in real projects.",
    ],
    tags: ["NPM", "Generative UI", "React", "Team lead", "University project"],
    npmUrl: "https://www.npmjs.com/package/@autoai-ui/autoui",
    repoUrl: "https://github.com",
  };
}

autouiRegisterFunctionParamsSchema(getBestProject);

export interface TechStackAndGoalsData {
  techStack: string[];
  interests: string[];
  oopNote: string;
  openTo: string;
  devOpsNote: string;
}

export function getTechStackAndGoals(): TechStackAndGoalsData {
  return {
    techStack: ["JavaScript", "TypeScript", "React", "Next.js"],
    interests: [
      "AI integrations",
      "Generative UI",
      "OOP languages (C#, Java, C++) — already strong in OOP, eager to go deeper.",
    ],
    oopNote: "I'm already really good at OOP and would love to work more with C#, Java, or C++.",
    openTo: "I'm open to any kind of propositions.",
    devOpsNote: "I would also like to study DevOps and CI/CD in depth.",
  };
}

autouiRegisterFunctionParamsSchema(getTechStackAndGoals);

export interface DifferentiatorData {
  points: string[];
}

export function getWhatMakesMeDifferent(): DifferentiatorData {
  return {
    points: [
      "I combine product thinking with code: I don't just implement specs — I propose ideas (e.g. AutoUI) and break them into deliverable tasks.",
      "I care about ownership: from planning sprints to shipping on NPM, I take responsibility for outcomes.",
      "I'm comfortable in both front-end and conceptual work (architecture, APIs, generative UI), and I keep learning (AI, DevOps, CI/CD).",
      "I work well in teams: I've led small teams, divided work clearly, and shipped a real library with friends.",
    ],
  };
}

autouiRegisterFunctionParamsSchema(getWhatMakesMeDifferent);

export interface ProblemsExciteMeData {
  intro: string;
  points: string[];
  quote?: string;
}

export function getProblemsThatExciteMe(): ProblemsExciteMeData {
  return {
    intro:
      "I'm excited by problems that expose my weak sides so I can turn them into strengths. I like challenges that force me to learn and to collaborate.",
    points: [
      "Finding gaps in my own knowledge so I can systematically improve.",
      "Designing systems that are simple for users but robust under the hood.",
      "Working with others who push me to explain my choices and refine my ideas.",
    ],
    quote:
      "The best way to grow is to run toward what you don't yet know.",
  };
}

autouiRegisterFunctionParamsSchema(getProblemsThatExciteMe);

