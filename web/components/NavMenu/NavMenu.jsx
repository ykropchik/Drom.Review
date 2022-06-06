import * as React from 'react';
import { Menu } from 'antd';

export default function NavMenu({ items, onSelect, ...props }) {
	return (
		<Menu {...props}
		      items={items}
		      onSelect={onSelect}
		      selectedKeys={[]}
		/>
	);
}