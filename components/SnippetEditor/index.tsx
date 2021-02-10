import { useState, useEffect, useCallback } from 'react'
import { executeQuery } from '../../graphql/client'
import {
	CREATE_SNIPPET_MUTATION,
	UPDATE_SNIPPET_MUTATION,
} from '../../graphql/mutations'
import { GET_SNIPPET_INFO } from '../../graphql/queries'
import { useSession } from 'next-auth/client'
import { CodeEditor } from '../Code'
import { TextArea } from '../TextArea'
import Input from '../Input'
import { Label } from '../Typography'
import {
	EditorForm,
	EditorArea,
	DescriptionArea,
	InfoArea,
	SubmitArea,
	InfoIcon,
} from './styles'
import TextLimiter from './TextLimiter'
import Button from '../Button'
import Dropdown from '../Dropdown'
import InfoModal from './InfoModal'
import Popups from '../Popup/Popup'
import useSWR from 'swr'
import request from 'graphql-request'
import { useRouter } from 'next/router'

const defaultCode = `function yourAwesomeFunction() {
    // copy or write your code!
}`

const limits = { title: 80, code: 2000, description: 1000 }

const fetcher = (query, id) =>
	request(process.env.NEXT_PUBLIC_HASURA_URL, query, { id }).then(
		data => data.snippet
	)

export default function SnippetEditor({ langs }: { langs: string[] }) {
	const router = useRouter()
	const id = router.query.edit
	const isEdit = id !== undefined
	const { data, error } = useSWR(
		isEdit ? [GET_SNIPPET_INFO, id] : null,
		fetcher,
		{
			revalidateOnFocus: false,
		}
	)
	const [snippet, setSnippet] = useState({
		title: '',
		code: defaultCode,
		description: '',
		programmingLang: 'JavaScript',
	})
	const [session] = useSession()
	const [showModal, setShowModal] = useState(false)
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(false)

	const cancelEdit = useCallback(() => {
		setSnippet(prevSnippet => ({
			...prevSnippet,
			title: '',
			description: '',
			code: defaultCode,
		}))
		router.push('/editor')
	}, [router])

	useEffect(() => {
		if (error) {
			cancelEdit()
		}
		if (data) {
			const { title, description, programmingLang, code, user } = data
			if (user.username != session.user.username) {
				cancelEdit()
			} else {
				setSnippet({ title, description, programmingLang, code })
			}
		}
	}, [data, error, cancelEdit])

	const onCodeChange = codeString => {
		setSnippet({ ...snippet, code: codeString })
	}

	const onLanguageChange = programmingLang => {
		setSnippet({ ...snippet, programmingLang })
	}

	const onChange = e => {
		setSnippet({ ...snippet, [e.target.name]: e.target.value })
	}

	const publishSnippet = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			await executeQuery(CREATE_SNIPPET_MUTATION, { ...snippet })
			setMessages(messages => [
				...messages,
				{ type: 'success', text: 'Snippet published!' },
			])
			setSnippet(prevSnippet => ({
				...prevSnippet,
				title: '',
				description: '',
				code: defaultCode,
			}))
			setLoading(false)
		} catch (err) {
			setMessages(messages => [
				...messages,
				{ type: 'error', text: 'Something went wrong, please try again' },
			])
			setLoading(false)
		}
	}

	const updateSnippet = async e => {
		e.preventDefault()
		setLoading(true)
		try {
			const { title, description, code } = snippet
			await executeQuery(UPDATE_SNIPPET_MUTATION, {
				id,
				title,
				description,
				code,
			})
			setMessages(messages => [
				...messages,
				{ type: 'success', text: 'Snippet updated!' },
			])
			setLoading(false)
			cancelEdit()
		} catch (err) {
			setMessages(messages => [
				...messages,
				{ type: 'error', text: 'Something went wrong, please try again' },
			])
			setLoading(false)
		}
	}

	return (
		<>
			<EditorForm>
				<EditorArea>
					<Label>Code</Label>
					<CodeEditor
						onChangeHandler={onCodeChange}
						valueHandler={snippet.code}
						language={snippet.programmingLang}
					/>
					<TextLimiter value={snippet.code} limit={limits.code} />
				</EditorArea>
				<InfoArea>
					<div>
						<Label>Title</Label>
						<Input
							placeholder="Title"
							value={snippet.title}
							onChange={onChange}
							name="title"
							spellCheck="false"
						/>
						<TextLimiter value={snippet.title} limit={limits.title} />
					</div>
					<div>
						<Label>Language</Label>
						{isEdit ? (
							<Button small as="div">
								{snippet.programmingLang}
							</Button>
						) : (
							<Dropdown
								options={langs}
								value={snippet.programmingLang}
								onSelect={onLanguageChange}
								right
							/>
						)}
					</div>
				</InfoArea>
				<DescriptionArea>
					<Label>
						Description
						<InfoIcon
							icon="info"
							size={16}
							variant="primary"
							onClick={() => setShowModal(true)}
						/>
					</Label>
					<div>
						<TextArea
							placeholder="Describe your snippet"
							className="description"
							name="description"
							onChange={onChange}
							value={snippet.description}
							spellCheck="false"
						/>
					</div>
					<TextLimiter value={snippet.description} limit={limits.description} />
				</DescriptionArea>

				<SubmitArea>
					{isEdit && (
						<Button
							variant="secondary"
							onClick={e => {
								e.preventDefault()
								cancelEdit()
							}}
							style={{ marginRight: '0.5rem' }}
						>
							Cancel
						</Button>
					)}
					<Button
						variant="primary"
						onClick={isEdit ? updateSnippet : publishSnippet}
						disabled={
							!snippet.title ||
							!snippet.code ||
							!snippet.description ||
							snippet.title.length > limits.title ||
							snippet.code.length > limits.code ||
							snippet.description.length > limits.description ||
							loading
						}
					>
						{isEdit ? 'Save' : 'Publish'}
					</Button>
				</SubmitArea>
			</EditorForm>
			{showModal && <InfoModal close={() => setShowModal(false)} />}
			<Popups popups={messages} setPopups={setMessages} />
		</>
	)
}
