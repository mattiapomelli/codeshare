import { useState } from "react"
import CodeHighlight from "./Code/CodeHighlight"
import { CodeLayout } from './Code/CodeLayout'
import { ScrollWrapper } from './Code/ScrollWrapper'
import { Icon } from './Icon/Icon'
import copyToClipboard from "../utils/copy-to-clipboard"
import styled from "styled-components"

const CopyButton = styled.div`
    position: absolute;
    bottom: 18px;
    right: 16px;
    border-radius: 5rem;
    padding: 0.6em;
    cursor: pointer;
    background-color: ${props => props.theme.colors.elements};
    &:hover { 
        background-color: ${props => props.theme.colors.accent}
    }
    svg { display: block; }
`

const CopiedText = styled.span`
    position: absolute;
    font-size: 0.8rem;
    bottom: 22px;
    right: 20px;
    font-family: monospace;
    background-color: ${props => props.theme.colors.elements};
    padding: 0.3rem;
`

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
        <CodeLayout language={language.toLowerCase()}>
            <ScrollWrapper height={preview ? "270px" : undefined}>
                <CodeHighlight codeString={codeString} language={language.toLowerCase()} wrapLines={true} wrapLongLines={false}/>
            </ScrollWrapper>
            {
                copied ? 
                <CopiedText>Copied&nbsp;
                    <Icon name="checked" size={14} type="primary"/>
                </CopiedText> :
                <CopyButton onClick={clickHandler}>
                    <Icon name="copy" size={16} type="primary"/>
                </CopyButton>
            }
        </CodeLayout>
    )
}

export default CodeBlock