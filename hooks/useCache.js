import { likesCache } from '../utils/cache'
import { useState } from 'react'

export const useCache = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const cachedValue = likesCache.get(key)
        return typeof cachedValue !== 'undefined' ? cachedValue : initialValue
    })

    const changeCache = () => {
        const increment = value.liked ? -1 : 1
        setValue({ liked: !value.liked, count: value.count + increment})
        likesCache.set(key, { liked: !value.liked, count: value.count + increment});
    }

    return {
        changeCache,
        value
    }
}

export default useCache
