import { createContext, useState, useContext } from 'react'

interface SearchValue {
	search: string
	setSearch: (string) => void
	activeLanguage: string
	setActiveLanguage: (string) => void
}

export const SearchContext = createContext<SearchValue | undefined>(undefined)

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
	const search = useProvideSearch()

	return (
		<SearchContext.Provider value={search}>{children}</SearchContext.Provider>
	)
}

export const useSearch = () => {
	const context = useContext(SearchContext)
	if (context === undefined) {
		throw new Error('useSearch must be used within a SearchProvider')
	}
	return context
}

function useProvideSearch() {
	const [search, setSearch] = useState('')
	const [activeLanguage, setActiveLanguage] = useState(null)

	return {
		search,
		setSearch,
		activeLanguage,
		setActiveLanguage,
	}
}

export default SearchProvider
