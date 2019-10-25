import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Layout } from "antd";

/* Css */
import "./container.css"
import "./header.css";

const { Content } = Layout;

const DefaultLayout = ({ className, children }) => {

    return (
        <Layout className={className}>
            <Header />
            <Content>
                {children}
            </Content>
            <Footer />
        </Layout>
    )

}

export default DefaultLayout;
