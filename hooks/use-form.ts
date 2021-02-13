import { ChangeEvent, FormEvent, useState } from 'react'

type FormData = {
	[field: string]: string
}

type OnSubmit = (data: FormData) => void

const useForm = (initialData: FormData = {}) => {
	const [formData, setFormData] = useState(initialData)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = (onSubmit: OnSubmit) => {
		return (e: FormEvent<HTMLFormElement>) => {
			if (e && typeof e.preventDefault === 'function') {
				e.preventDefault()
			}
			onSubmit(formData)
		}
	}

	const resetForm = () => {
		setFormData(initialData)
	}

	return { formData, handleInputChange, handleSubmit, resetForm }
}

export default useForm
