export interface Snippet {
	code: string
	programmingLang: string
	title: string
	id: string
	likesNum: number
	liked: boolean
	user: { username: string }
}

export interface RawSnippet {
	code: string
	description: string
	id: string
	title: string
	programmingLang: string
	likes: {
		createdAt: string
	}
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
