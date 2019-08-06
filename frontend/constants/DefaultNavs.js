import React from 'react';
import { Icon } from "antd";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {ROOT_PATH} = publicRuntimeConfig;

const DefaultNavs = [
    {
        key: 'home',
        title: 'Home',
        path: ROOT_PATH,
        icon: <Icon type="home" />,
        subMenu: null
    }
];

export default DefaultNavs;
