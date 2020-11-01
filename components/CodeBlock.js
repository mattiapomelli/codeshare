import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars';
import theme from 'react-syntax-highlighter/dist/cjs/styles/hljs/github';
 
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('html', html);

const CodeBlock = ({ codeString, language, pre }) => {

    return (
        <SyntaxHighlighter language={language} style={theme} PreTag={pre}
            customStyle={{background: "transparent", fontSize: '1.1rem', overflow: 'visible'}}>
            {codeString}
        </SyntaxHighlighter>
  );
};

export default CodeBlock