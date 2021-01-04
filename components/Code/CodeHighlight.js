import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml';
import htmlbars from 'react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars';
import css from 'react-syntax-highlighter/dist/cjs/languages/hljs/css';
import python from 'react-syntax-highlighter/dist/cjs/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/cjs/languages/hljs/java';
import php from 'react-syntax-highlighter/dist/cjs/languages/hljs/php';
import sql from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql';
import go from 'react-syntax-highlighter/dist/cjs/languages/hljs/go';
import cLike from 'react-syntax-highlighter/dist/cjs/languages/hljs/c-like';
import c from 'react-syntax-highlighter/dist/cjs/languages/hljs/c';
import cpp from 'react-syntax-highlighter/dist/cjs/languages/hljs/cpp';
import theme from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
// theme["hljs-keyword"].fontStyle = "normal";
// theme["hljs-built_in"].fontStyle = "normal";
// theme["hljs-title"].fontStyle = "normal";
 
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('html', htmlbars);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('c-like', cLike);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);

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