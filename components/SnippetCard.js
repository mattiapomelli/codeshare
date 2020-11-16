import CodeBlock from "./CodeBlock"
import Link from "next/link"
import copyToClipboard from "../utils/copy-to-clipboard"
import { Container, Header, Body, ScrollWrapper, CopyButton, Tooltip } from "./elements/SnippetElements"

const SnippetCard = ({ code, programmingLang, title, id, preview, likes_aggregate, likes }) => {
    const isLiked = likes ? likes.length > 0 : false

    const clickHandler = (e) => {
        e.preventDefault();
        copyToClipboard(code)
        let element = e.target
        element.innerHTML = `Copied <svg width="14.4" height="10.72" viewBox="0 0 90 67" fill="none">
        <path d="M14 21.5L3 33L36.5 63.5L87 14.5L76 3.5L36.5 42.5L14 21.5Z" fill="#6BD97C" stroke="black" stroke-width="4"/>
        </svg>`
        element.classList.add('copied')
        if (typeof window !== "undefined") {    // so it doesn't throw an error on build (is this really needed?) 
            window.setTimeout(() => {
                element.innerHTML = "Copy"
                element.classList.remove('copied')
            }, 2400)
        }
    }

    return (
        <Container>
            <Tooltip className={`${programmingLang.toLowerCase()}`}>{programmingLang}</Tooltip>
            { preview && <Link href={`/snippet/${id}`}><Header>{title}</Header></Link> }        
            <Body>
                <ScrollWrapper>
                    <CodeBlock codeString={code} language={programmingLang}/>
                </ScrollWrapper>
            </Body>
            <CopyButton onClick={clickHandler}>Copy</CopyButton>
            <div style={{backgroundColor: isLiked ? "red" : "black", width: '20px', height: '20px', color: 'white', textAlign: 'center', borderRadius: '10px'}}>
                {likes_aggregate.aggregate.count}
            </div>
        </Container>
    )
}

export default SnippetCard