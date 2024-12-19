import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string | null;
}

export const Markdown = ({ children }: MarkdownProps) => {
  if (!children) return null;
  
  return <ReactMarkdown>{children}</ReactMarkdown>;
}; 