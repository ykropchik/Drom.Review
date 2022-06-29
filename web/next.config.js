/* eslint-disable */
const withLess = require("next-with-less");

module.exports = withLess({
	async rewrites() {
		return [
			{
				source: '/logout',
				destination: '/login',
			},
			{
				source: '/',
				destination: '/reviews'
			},
			{
				source: '/reviews',
				destination: '/reviews/scrum'
			}
		]
	}
});