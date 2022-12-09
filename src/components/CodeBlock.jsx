import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = () => {
  const codeString = `
const Square = (n) => {
  return n * n
}
`;
  return (
    <div>
      <SyntaxHighlighter
        language="javascript"
        style={docco}
        showLineNumbers="true"
        customStyle={{ borderRadius: "5px" }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
