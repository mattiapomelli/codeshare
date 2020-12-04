import Link from "next/link"
import Navbar from "../components/Navbar"
import { Hero } from "../components/elements/MainElements"
import { Button } from "../components/Button"
import Image from "next/image"

export default function Home() {

	return (
		<>
			<Navbar/>
			<Hero>
				<h1>Share the code you are proud of</h1>
				<p>The platform where you can find the code snippets you need for your and share you best code to help others  </p>
				<div>
					<Link href="/signup">
						<Button>GET STARTED</Button>
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
