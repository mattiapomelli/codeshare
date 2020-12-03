import { useState } from "react"
import CodeHighlight from "./CodeHighlight"
import { CodeWrapper, ScrollWrapper } from "./elements/CodeElements"
import copyToClipboard from "../utils/copy-to-clipboard"

const CodeBlock = ({ codeString, language, preview }) => {
    const [copied, setCopied] = useState(false)

    const clickHandler = (e) => {
        e.preventDefault();
        copyToClipboard(codeString)
        setCopied(true);
        window.setTimeout(() => {
            setCopied(false);
        }, 2400)
    }

    return (
        <CodeWrapper language={language.toLowerCase()}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="tooltip">{language}</span>
            <ScrollWrapper height={preview ? "270px" : undefined}>
                <CodeHighlight codeString={codeString} language={language.toLowerCase()} wrapLines={true} wrapLongLines={false}/>
            </ScrollWrapper>
            {
                copied ? 
                <span className="copied">Copied&nbsp;
                    <svg width="14.4" height="10.72" viewBox="0 0 90 67" fill="none">
                        <path d="M14 21.5L3 33L36.5 63.5L87 14.5L76 3.5L36.5 42.5L14 21.5Z" fill="#6BD97C" stroke="black" strokeWidth="4"/>
                    </svg>
                </span> :
                <span className="material-icons copy-button" onClick={clickHandler}>content_copy</span>
            }
        </CodeWrapper>
    )
}

export default CodeBlock