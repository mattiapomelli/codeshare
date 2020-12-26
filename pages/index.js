import { useEffect } from 'react'
import Link from "next/link"
import Navbar from "../components/Navbar"
import { Button } from "../components/Button"
import Image from "next/image"
import styled from "styled-components"
import Flex from '../components/Flex'
import withNoAuth from '../hocs/withNoAuth'
import PageHead from '../components/PageHead'
import CookiesPopup from '../components/CookiesPopup'
import Footer from '../components/Footer'
import { logPageView } from '../utils/analytics'

const Hero = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%;
    max-width: 1200px;
    margin: 4rem auto 8rem auto;

    h1 {
        font-size: 3rem;
        font-weight: 400;
        margin-bottom: 2rem;
        text-align: center;
        line-height: 1.1;
        height: 11rem;

        @media only screen and (min-width: 450px) {
            height: 6rem;
        }

        @media only screen and (min-width: 900px) {
            height: auto;
        }
    }
    p {
        font-size: 1rem;
        font-weight: 300;
        color: ${props => props.theme.colors.text};
        width: 90%;
        max-width: 500px;
        text-align: center;
        margin-bottom: 2rem;
    }
    button { margin: 0 5px 2rem 5px; }
`

const titles = ["Find the code you need", "Share the code you are proud of"]

const Home = () => {

    useEffect(() => {
        const heading = document.getElementById("heading")
        let i = 1, j = 0, timeout, delta

        function typeEffect() {
            heading.innerText = titles[j].substring(0, i)

            if(i > titles[j].length) {
                delta = 2700
                i = 1
                j = (j + 1) % titles.length
            } else {
                delta = 100
                i++
            }

            timeout = setTimeout(typeEffect, delta);
        }

        typeEffect()
        
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(()=>{
        logPageView()
    }, [])

	return (
		<>
            <PageHead title="Codeshare"/>
			<Navbar/>
			<Hero>
				<h1 id="heading"></h1>
				<p>The place where you can find the code snippets you need and share your best code to help others  </p>
				<Flex h="center" flexWrap="wrap">
					<Link href="/signup">
						<Button type="secondary">LEARN MORE</Button>
					</Link>
					<Link href="/signup">
						<Button type="primary">GET STARTED</Button>
					</Link>
				</Flex>
				<Image src="/hero.svg" width={612} height={392} layout="responsive" className="image"/>
			</Hero>
            <Footer />
            <CookiesPopup/>
		</>
	)
}

export default withNoAuth(Home)