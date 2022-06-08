import * as React from 'react';
import { Menu } from 'antd';

const NavMenu = React.memo(({ items, onSelect, ...props }) => {
	return (
		<Menu {...props}
		      items={items}
		      onSelect={onSelect}
		      selectedKeys={[]}
		/>
	);
});

NavMenu.displayName = 'NavMenu';

export default NavMenu;