import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './MarkdownRender.module.scss';
import classNames from 'classnames';

export default function MarkdownRender({ className, mdText }) {
	return (
		<div className={classNames(styles.markdown_body, className)}>
			<ReactMarkdown>
				{mdText}
			</ReactMarkdown>
		</div>
	);
}