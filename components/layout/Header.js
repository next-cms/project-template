import React, {useEffect} from 'react';
import {Icon, Layout, Menu} from 'antd';
import Link from 'next/link';
import Head from 'next/head';

const Header = () => {

    const shrinkHeader = () => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100,
            headerEl = document.getElementById("header");
        if (distanceY > shrinkOn) {
            headerEl.classList.add("smaller");
        } else {
            headerEl.classList.remove("smaller");
        }

    };
    useEffect(() => {
        console.log("useeffect called");
        window.addEventListener("scroll", shrinkHeader);
    }, [shrinkHeader]);


    return (

        <Layout.Header id="header" className="header">
            <Head>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Montserrat"/>
            </Head>
            <div className="header-contents" style={{}}>
                <Icon type="menu" className="toggle-menu-icon"/>
                <div id="logo" className="logo"><img src="/static/logo.png"/></div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    className="menu-bar"
                    style={{}}
                >

                    <Menu.Item className="menu-item" key="1">
                        Projekt/tidplan
                        <Link href="/"><a/></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="2">
                        Bilder/Skisser
                        <Link href="/bilderskisser"><a/></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="3">
                        fakta lokaler
                        <Link href="/fakta-lokaler"><a/></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="4">
                        ekonomi/status
                        <Link href="/ekonomistatus"><a/></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="5">kontakt
                        <Link href="/kontakt"><a/></Link>
                    </Menu.Item>
                </Menu>

            </div>
        </Layout.Header>
    )

};

export default Header;
