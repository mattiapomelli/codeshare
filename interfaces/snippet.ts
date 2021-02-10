export interface Snippet {
	id: string
	title: string
	code: string
	programmingLang: string
	description: string
	likesNum: number
	liked: boolean
	user: { username: string }
}

export interface RawSnippet {
	id: string
	title: string
	code: string
	programmingLang: string
	description: string
	likes?: [
		{
			createdAt: string
		}
	]
	likes_aggregate: {
		aggregate: {
			count: number
		}
	}
	user: {
		username: string
	}
}

export interface SnippetsResponse {
	snippets: RawSnippet[]
}
