/* eslint-disable */
const withLess = require("next-with-less");

module.exports = withLess({
	async rewrites() {
		return [
			{
				source: '/logout',
				destination: '/login',
			}
		]
	},
	async redirects() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost/:path*',
				permanent: true
			}
		]
	}
});