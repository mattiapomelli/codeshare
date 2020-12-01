import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import theme from 'react-syntax-highlighter/dist/cjs/styles/hljs/solarized-light';
 
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('css', css);

const CodeHighlight = ({ codeString, language, wrapLongLines, pre }) => {

    return (
        <SyntaxHighlighter
            language={language.toLowerCase()}
            style={theme}
            PreTag={pre}
            wrapLines={true}
            showLineNumbers={false}
            showInlineLineNumbers={false}
            customStyle={{background: "transparent", overflow: 'visible', padding: 0}}
            wrapLongLines={wrapLongLines}
        >
            {codeString}
        </SyntaxHighlighter>
  );
};

export default CodeHighlight