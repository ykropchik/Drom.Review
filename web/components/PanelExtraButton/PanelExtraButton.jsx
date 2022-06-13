import React from 'react';
import styles from './PanelExtraButton.module.scss';

export default function PanelExtraButton({ icon, onClick }) {
	return React.cloneElement(icon, {
		className: styles.edit_button,
		onClick: (event) => {
			event.stopPropagation();
			onClick();
		}
	});
}