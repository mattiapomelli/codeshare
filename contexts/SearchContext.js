import {createContext, useState, useContext } from 'react'

export const SearchContext = createContext()

const SearchProvider = ({ children }) => { 
    const search = useProvideSearch()

    return (
        <SearchContext.Provider value={search}>
            { children }
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    return useContext(SearchContext);
}

function useProvideSearch() {
    const [search, setSearch] = useState("")
    const [activeLanguage, setActiveLanguage] = useState(null)

    return {
        search,
        setSearch,
        activeLanguage,
        setActiveLanguage
    }
}

export default SearchProvider