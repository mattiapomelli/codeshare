import { useState, useCallback } from 'react'
import { cache } from '@/utils/cache'

const useCache = <T>(
  key: string,
  initialValue: T
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const cachedValue = cache.get(key)
    return typeof cachedValue !== 'undefined' ? cachedValue : initialValue
  })

  const changeCache = useCallback(
    (newValue: T) => {
      setValue(newValue)
      cache.set(key, newValue)
    },
    [key]
  )

  return [value, changeCache]
}

export default useCache
