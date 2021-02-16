import { useEffect, useRef } from 'react'

type Callback = () => void

const useOnClickOutside = <T extends HTMLElement>(callback: Callback) => {
	const ref = useRef<T>()
	const savedCallback = useRef<Callback>()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		function handleClick(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				savedCallback.current()
			}
		}

		window.addEventListener('click', handleClick)

		return () => window.removeEventListener('click', handleClick)
	}, [])

	return ref
}

export default useOnClickOutside
