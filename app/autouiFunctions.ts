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

