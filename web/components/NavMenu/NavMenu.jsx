import * as React from 'react';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NavMenu = React.memo(({ items, onSelect, ...props }) => {
	const router = useRouter();
	const [selectedKey, setSelectedKey] = useState(null);

	useEffect(() => {
		setSelectedKey(items.filter((item) => router.pathname.includes(`/${item.key}`))[0]?.key);
	}, [router.pathname]);

	return (
		<Menu {...props}
		      items={items}
		      onSelect={onSelect}
		      selectedKeys={[selectedKey]}
		/>
	);
});

NavMenu.displayName = 'NavMenu';

export default NavMenu;