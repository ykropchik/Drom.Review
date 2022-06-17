import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRender({ mdText, forwardRef, ...props }) {
	return (
		<div ref={forwardRef} {...props}>
			<ReactMarkdown>
				{mdText}
			</ReactMarkdown>
		</div>
	);
}