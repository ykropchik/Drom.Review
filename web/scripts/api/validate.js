export class Validator {
	constructor() {
		this.controller = new AbortController();
	}

	async validate(endPoint, data) {
		this.controller.abort();

		try {
			let result = await fetch(endPoint, {
				method: 'POST',
				signal: this.controller.signal,
				body: data
			});
			return await result.json();
		} catch (e) {
			if (e.name !== 'AbortError') {
				throw e;
			}
		}
	}
}