import { likesCache } from '../utils/cache'
import { useState } from 'react'

export const useCache = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const cachedValue = likesCache.get(key)
        return typeof cachedValue !== 'undefined' ? cachedValue : initialValue
    })

    const changeCache = (newValue) => {
        setValue(newValue)
        likesCache.set(key, newValue);
    }

    return {
        changeCache,
        value
    }
}

export default useCache
