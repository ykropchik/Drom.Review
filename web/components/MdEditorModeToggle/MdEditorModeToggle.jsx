import React from 'react';
import { PluginComponent } from 'react-markdown-editor-lite';

export class MdEditorModeToggle extends PluginComponent {
	static pluginName = 'CustomModeToggle';
	static align = 'right';
	static defaultConfig = {
		preview: false
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			preview: this.getConfig('preview')
		};
	}

	handleClick() {
		this.editor.setState({
			...this.editor.state,
			view: {
				menu: true,
				md: this.state.preview,
				html: !this.state.preview
			}
		});
		this.setState({
			preview: !this.state.preview
		});
	}

	render() {
		return (
			<span
				className="button button-type-counter"
				title={this.state.preview ? 'Редактор' : 'Предпросмотр'}
				onClick={this.handleClick}>
				{
					this.state.preview
						?
						<i className="rmel-iconfont rmel-icon-keyboard"/>
						:
						<i className="rmel-iconfont rmel-icon-visibility"/>
				}
			</span>
		);
	}
}
