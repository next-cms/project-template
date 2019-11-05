import React, { useEffect } from 'react';
import { Icon, Layout, Menu } from 'antd';
import Link from 'next/link';
import Head from 'next/head';
import { useQuery } from 'graphql-hooks';
import { handleGraphQLAPIErrors } from '../../utils/helpers';

const GET_SINGLE_MENU = `query getSingleMenuFromProjectById($projectId: String!, $id: String!) {
    getSingleMenuFromProjectById(projectId: $projectId , id: $id) {
        id
        name
        items {
          name
          children {
            name
          }
        }
      }
  }
  `

const Header = () => {

    // const { loading, error, data, refetch } = useQuery(GET_SINGLE_MENU, {
    //     variables: { projectId: "5da060c61eda6430cc4c4e4d", id: "5db68d390684942e2dc077fa" },
    //     skipCache: true
    // });

    // useEffect(() => {
    //     if (error) {
    //         handleGraphQLAPIErrors(error);
    //     }
    // }, [error]);

    // if (error || !data) return null;

    // const { dataObjectsBySlug } = data;

    // if (loading) return null;

    // console.log("Menus", data);


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
            <div className="header-contents" style={{}}>
                <Icon type="menu" className="toggle-menu-icon" />
                <div id="logo" className="logo"><img src="/static/logo.png" /></div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    className="menu-bar"
                    style={{}}
                >

                    <Menu.Item className="menu-item" key="1">
                        Projekt/tidplan
                        <Link href="/"><a /></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="2">
                        Bilder/Skisser
                        <Link href="/bilderskisser"><a /></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="3">
                        fakta lokaler
                        <Link href="/fakta-lokaler"><a /></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="4">
                        ekonomi/status
                        <Link href="/ekonomistatus"><a /></Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="5">kontakt
                        <Link href="/kontakt"><a /></Link>
                    </Menu.Item>
                </Menu>

            </div>
        </Layout.Header>
    )

};

export default Header;
