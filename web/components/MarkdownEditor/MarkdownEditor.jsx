import React from 'react';
import Editor, { Plugins } from 'react-markdown-editor-lite';
import styles from './MarkdownEditor.module.scss';
import MarkdownRender from '../MarkdownRender/MarkdownRender';
import 'react-markdown-editor-lite/lib/index.css';
import { MdEditorModeToggle } from '../MdEditorModeToggle/MdEditorModeToggle';
import classNames from 'classnames';

export default function MarkdownEditor({ className, onChange }) {

	function handleEditorChange({ text }) {
		onChange(text);
	}

	Editor.useLocale('ru-RU');
    
	return (
		<div className={classNames(styles.content, className)}>
			<Editor
				style={{
					minHeight: 200,
					maxHeight: 500,
					border: 'none',
					borderBottom: '1px solid var(--dark-accent)'
				}}
				htmlClass={styles.html_container}
				renderHTML={text => <MarkdownRender mdText={text.trim() === '' ? '## Нечего нет для предварительного просмотра' : text}/>}
				syncScrollMode={['leftFollowRight']}
				view={{ html: false }}
				onChange={(obj) => handleEditorChange(obj)}
				plugins={
					[
						'header',
						'font-bold',
						'font-italic',
						'font-underline',
						'font-strikethrough',
						'list-unordered',
						'list-ordered',
						'block-quote',
						'block-wrap',
						'block-code-inline',
						'block-code-block',
						'table',
						'image',
						'link',
						'clear',
						'logger',
						'tab-insert',
						'CustomModeToggle'
					]
				}
			/>
		</div>
	);
}

Editor.use(Plugins.TabInsert, {
	tabMapValue: 1
});

Editor.use(MdEditorModeToggle, {
	preview: false
});

Editor.addLocale('ru-RU', {
	clearTip: 'Вы уверены, что хотите удалить весь контент?',
	btnHeader: 'Заголовок',
	btnClear: 'Удалить',
	btnBold: 'Полужирный',
	btnItalic: 'Курсив',
	btnUnderline: 'Подчеркнутый',
	btnStrikethrough: 'Зачеркнутый',
	btnUnordered: 'Неупорядоченный список',
	btnOrdered: 'Упорядоченный список',
	btnQuote: 'Цитирование',
	btnLineBreak: 'Разрыв строки',
	btnInlineCode: 'Inline код',
	btnCode: 'Код',
	btnTable: 'Таблица',
	btnImage: 'Картинка',
	btnLink: 'Ссылка',
	btnUndo: 'Отменить',
	btnRedo: 'Повторить',
	btnFullScreen: 'Полноэкранный режим',
	btnExitFullScreen: 'Выход из полноэкранного режима',
	btnModeEditor: 'Только редактор',
	btnModePreview: 'Только предпросмотр',
	btnModeAll: 'Показывать редактор и предпросмотр',
	selectTabMap: 'Фактический ввод при нажатии Tab',
	tab: 'Tab',
	spaces: 'Пробела/ов'
});

Editor.unuse(Plugins.ModeToggle);
Editor.unuse(Plugins.FullScreen);