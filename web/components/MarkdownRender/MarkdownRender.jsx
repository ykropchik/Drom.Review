import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRender({ className, mdText }) {
	return (
		<div className={className}>
			<ReactMarkdown>
				{mdText}
			</ReactMarkdown>
		</div>
	);
}