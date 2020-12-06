import Link from "next/link"
import Navbar from "../components/Navbar"
import { Button } from "../components/Button"
import Image from "next/image"
import styled from "styled-components"

const Hero = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%;
    max-width: 1200px;
    margin: 4rem auto 0 auto;

    h1 {
        font-size: 3rem;
        font-weight: 400;
        margin-bottom: 2rem;
        text-align: center;
    }
    p {
        font-size: 1rem;
        font-weight: 300;
        color: ${props => props.theme.colors.text};
        width: 50%;
        text-align: center;
        margin-bottom: 2rem;
    }
    button:first-of-type { margin-right: 10px; }
    button { margin-bottom: 2rem; }
`

export default function Home() {

	return (
		<>
			<Navbar/>
			<Hero>
				<h1>Share the code you are proud of</h1>
				<p>The platform where you can find the code snippets you need for your and share you best code to help others  </p>
				<div>
					<Link href="/signup">
						<Button>LEARN MORE</Button>
					</Link>
					<Link href="/signup">
						<Button type="primary">GET STARTED</Button>
					</Link>
				</div>
				<Image src="/hero.svg" width={612} height={392} layout="responsive" className="image"/>
			</Hero>
		</>
	)
}
