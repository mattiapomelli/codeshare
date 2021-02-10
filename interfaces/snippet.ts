export interface Snippet {
	code: string
	programmingLang: string
	title: string
	id: string
	likesNum: number
	liked: boolean
	user: { username: string }
}
