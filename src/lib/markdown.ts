import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(src: string): string {
  let html = marked.parse(src, { async: false }) as string;
  html = html.replace(
    /<a\b((?:[^>]*?\bhref="https?:[^"]*")[^>]*)>/gi,
    (match, attrs) => {
      if (/\btarget=/.test(attrs)) return match;
      return `<a${attrs} target="_blank" rel="noopener noreferrer">`;
    }
  );
  return html;
}
