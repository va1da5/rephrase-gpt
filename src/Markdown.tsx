import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as darkCodeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import rehypeRaw from "rehype-raw";

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      children={children}
      remarkPlugins={[remarkGfm]}
      // rehypePlugins={[rehypeRaw]}
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, "")}
              style={darkCodeStyle as any}
              language={match ? match[1] : "text"}
              PreTag="div"
              {...props}
            />
          ) : (
            <code
              {...props}
              className="rounded-md bg-zinc-100 p-1 font-mono text-sm text-red-600"
            >
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default Markdown;
