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
				source: '/api/:path*',
				destination: 'https://i.pravatar.cc/:path*',
			},
		]
	},
});