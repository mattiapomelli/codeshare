import { likesCache } from '../utils/cache'
import { useState } from 'react'

function useCache<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		const cachedValue = likesCache.get(key)
		return typeof cachedValue !== 'undefined' ? cachedValue : initialValue
	})

	const changeCache = (newValue: T) => {
		setValue(newValue)
		likesCache.set(key, newValue)
	}

	return {
		changeCache,
		value,
	}
}

export default useCache
