import { useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import Flex from '@/components/Flex'
import withNoAuth from '@/hocs/withNoAuth'
import PageHead from '@/components/PageHead'
import CookiesPopup from '@/components/CookiesPopup'
import Button from '@/components/Button'

const Hero = styled.section`
	margin-top: 1rem;
	display: flex;
	align-items: center;
	flex-direction: column;

	h1 {
		font-size: 3rem;
		font-weight: 400;
		margin-bottom: 2rem;
		text-align: center;
		line-height: 1.1;
		height: 12rem;

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
		color: ${(props) => props.theme.colors.text};
		width: 90%;
		max-width: 500px;
		text-align: center;
		margin-bottom: 2rem;
	}
	button {
		margin: 0 5px 1rem 5px;
	}
	img {
		margin-top: 1rem;
	}
`

const titles = ['Find the code you need', 'Share the code you are proud of']

const LandingPage: NextPage = () => {
	useEffect(() => {
		const heading = document.getElementById('heading')
		let i = 1,
			j = 0,
			timeout,
			delta

		function typeEffect() {
			heading.innerText = titles[j].substring(0, i)

			if (i > titles[j].length) {
				delta = 2700
				i = 1
				j = (j + 1) % titles.length
			} else {
				delta = 100
				i++
			}

			timeout = setTimeout(typeEffect, delta)
		}

		typeEffect()

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return (
		<>
			<PageHead title="Codeshare – Share the code you are proud of" />
			<Hero>
				<h1 id="heading"></h1>
				<p>
					The place where you can find the code snippets you need and share your
					best code to help others
				</p>
				<Flex h="center" flexWrap="wrap">
					<Link href="/snippets">
						<Button variant="secondary">LEARN MORE</Button>
					</Link>
					<Link href="/signup">
						<Button variant="primary">GET STARTED</Button>
					</Link>
				</Flex>
				<Image src="/hero.svg" width={612} height={392} className="image" />
			</Hero>
			<CookiesPopup />
		</>
	)
}

export default withNoAuth(LandingPage)
