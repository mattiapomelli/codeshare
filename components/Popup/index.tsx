import { StyledPopup, CloseButton } from './styles'
export { PopupsContainer } from './styles'
import Icon from '@/components/Icon'

interface Props {
	children: string | React.ReactNode
	type: 'error' | 'success'
	onClose: () => void
}

export default function Popup({ children, type, onClose }: Props) {
	return (
		<StyledPopup v="center">
			<Icon icon={type} size={26} />
			{children}
			<CloseButton onClick={onClose}>
				<Icon icon="cross" size={16} />
			</CloseButton>
		</StyledPopup>
	)
}
