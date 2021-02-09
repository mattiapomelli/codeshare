import Modal from '../Modal'
import { P } from '../Typography'
import styled from 'styled-components'

const BulletList = styled.ul`
	list-style: disc;
	margin-top: 0.7rem;
	padding-left: 1rem;
`

interface Props {
	close: () => void
}

export default function InfoModal({ close }: Props) {
	return (
		<Modal close={close}>
			<h4>Wondering what you should write in your snippet's description?</h4>

			<P>
				Here are some advices about what could be worth mentioning:
				<BulletList>
					<li>explain what your code does</li>
					<li>explain a little bit about how it works</li>
					<li>list some use cases and examples on how to use it</li>
					<li>
						be sure to report if your code has any dependencies, and if so which
						they are
					</li>
				</BulletList>
			</P>
		</Modal>
	)
}
