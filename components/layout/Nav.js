import React from 'react';

const Nav = () => {
    /* Menu Binding Start */
    const getMenuItems = (item) => {
        return (item.children && item.children.length > 0) ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    }

    const bindSingleMenuItem = (item) => {
        return (
            <Menu.Item key={item[itemKey]}>
                <span>{item.name}</span>
                {item.href && <Link href={item.href}><a/></Link>}
            </Menu.Item>
        )
    }

    const bindSubMenuItem = (item) => {
        return (
            <SubMenu
                key={item[itemKey]}
                title={
                    <span>
                        {item.icon}
                        <span>{item.name}</span>
                    </span>
                }
            >
                {item.children.map(item => getMenuItems(item))}
            </SubMenu>
        )
    }
    /* Menu Binding End */

    return (
        <Menu theme={theme} defaultSelectedKeys={[defaultKeys]} mode={mode}>
            {menus.map(item => getMenuItems(item))}
        </Menu>
    );
}
 
export default Nav;