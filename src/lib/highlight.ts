import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["one-dark-pro"],
      langs: ["python", "sql", "bash", "json", "javascript", "typescript"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, lang = "python"): Promise<string> {
  const hl = await getHighlighter();
  const supported = hl.getLoadedLanguages().includes(lang);
  const language = supported ? lang : "python";
  return hl.codeToHtml(code, {
    lang: language,
    theme: "one-dark-pro",
  });
}
