import { useEffect } from 'react'
import { Popup, PopupsContainer, CloseButton } from './PopupElements'
import { Icon } from '../Icon/Icon'

export default function Popups({ popups, setPopups }) {

    useEffect(() => {
        if (popups.length > 0) {
            const timer = setTimeout(() => {
                setPopups(popups => popups.slice(1))
            }, 10000)

            return () => clearTimeout(timer)
        }
    }, [popups])

    const removePopup = (index) =>  {
        const newPopups = [...popups]
        newPopups.splice(index, 1)
        setPopups(newPopups)
    }

    return (
        <PopupsContainer>
            {
                popups.map((popup, index) => (
                    <Popup key={index} v="center">
                        <Icon name={popup.type} size={26}/>
                        {popup.text}
                        <CloseButton onClick={() => {removePopup(index)}}>
                            <Icon name="cross" size={16}/>
                        </CloseButton>
                    </Popup>
                ))
            }
        </PopupsContainer>
    )
}
