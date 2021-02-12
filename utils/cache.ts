/* eslint-disable  @typescript-eslint/no-explicit-any */

class Cache {
	private cache: Map<string, any>

	constructor() {
		this.cache = new Map()
	}

	get(key: string): any {
		return this.cache.get(key)
	}

	set(key: string, value: any) {
		this.cache.set(key, value)
	}
}

const cache = new Cache()

export { cache }
