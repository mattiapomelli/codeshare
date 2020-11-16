import {createContext, useState, useContext, useEffect, useCallback } from 'react'
import { PopupsContainer, Popup } from "../components/elements/PopupElements"

export const PopupContext = createContext()

const PopupProvider = ({ children }) => { 
    const [popups, setPopups] = useState([]);

    useEffect(() => {
        if (popups.length > 0) {
            const timer = setTimeout(() => {
                setPopups(popups => popups.slice(1))
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [popups])

    const addPopup = useCallback((popup) => {
        setPopups(popups => [...popups, popup])
    }, [])

    return (
        <PopupContext.Provider value={addPopup}>
            { children }
            <PopupsContainer>
                {
                    popups.map((popup, index) => (
                        <Popup key={index}>
                            {popup}
                        </Popup>
                    ))
                }
            </PopupsContainer>
        </PopupContext.Provider>
    )
}

export const usePopup = () => {
    return useContext(PopupContext);
}

export default PopupProvider