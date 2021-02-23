import { FunctionComponent } from 'react'
import { StyledPopup, CloseButton } from './styles'
export { PopupsContainer } from './styles'
import Icon from '@/components/Icon'

interface PopupProps {
  children: string | React.ReactNode
  type: 'error' | 'success'
  onClose: () => void
}

const Popup: FunctionComponent<PopupProps> = ({ children, type, onClose }) => {
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

export default Popup
