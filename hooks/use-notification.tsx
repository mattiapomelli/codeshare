import {
	useEffect,
	useReducer,
	useContext,
	useCallback,
	createContext,
	FunctionComponent,
} from 'react'
import Popup, { PopupsContainer } from '@/components/Popup'

interface ProviderProps {
	children: React.ReactNode
}

type NotificationType = 'success' | 'error'

interface Notification {
	type: 'success' | 'error'
	content: string | React.ReactNode
	id: number
}

type Payload = { content: string | React.ReactNode; type: NotificationType }

type State = Notification[]
type Action =
	| { type: 'ADD'; payload: Payload }
	| { type: 'REMOVE'; payload: { id: number } }
	| { type: 'REMOVE_FIRST' }

type ContextValue = (payload: Payload) => void | undefined

const NotificationContext = createContext<ContextValue>(undefined)

const notificationReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'ADD':
			return [
				...state,
				{
					id: Math.random(),
					content: action.payload.content,
					type: action.payload.type,
				},
			]
		case 'REMOVE':
			return state.filter((t) => t.id !== action.payload.id)
		case 'REMOVE_FIRST':
			return state.slice(1)
		default:
			return state
	}
}

export const NotificationProvider: FunctionComponent<ProviderProps> = ({
	children,
}) => {
	const [messages, messageDispatch] = useReducer(notificationReducer, [])

	useEffect(() => {
		if (messages.length === 0) return

		const timer = setTimeout(() => {
			messageDispatch({ type: 'REMOVE_FIRST' })
		}, 8000)

		return () => clearTimeout(timer)
	}, [messages])

	const closeNotification = (id: number) => {
		messageDispatch({ type: 'REMOVE', payload: { id } })
	}

	const addNotification = useCallback((payload: Payload) => {
		messageDispatch({ type: 'ADD', payload })
	}, [])

	return (
		<NotificationContext.Provider value={addNotification}>
			{children}
			<PopupsContainer>
				{messages.map((toast) => (
					<Popup
						key={toast.id}
						type={toast.type}
						onClose={() => closeNotification(toast.id)}
					>
						{toast.content}
					</Popup>
				))}
			</PopupsContainer>
		</NotificationContext.Provider>
	)
}

const useNotification = () => {
	const context = useContext(NotificationContext)

	if (context === undefined) {
		throw new Error(
			'useNotification must be used within a NotificationProvider'
		)
	}

	return context
}

export default useNotification
