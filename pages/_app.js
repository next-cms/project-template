import App from "next/app";
import React from "react";
import nextCookie from "next-cookies";
import { ClientContext } from "graphql-hooks";
import withGraphQLClient from "../utils/withGraphQLClient";
import Router from "next/router";
import NProgress from "nprogress";
import Head from "next/head";

NProgress.configure({parent: "#__next", trickleSpeed: 400});

Router.events.on("routeChangeStart", url => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on("routeChangeError", () => NProgress.done());
Router.events.on("routeChangeComplete", () => {
    if (process.env.NODE_ENV !== "production") {
        const els = document.querySelectorAll("link[href*=\"/_next/static/css/styles.chunk.css\"]");
        const timestamp = new Date().valueOf();
        els[0] && (els[0].href = "/_next/static/css/styles.chunk.css?v=" + timestamp);
    }
    NProgress.done();
});

class CMSApp extends App {
    static async getInitialProps({Component, ctx}) {
        const {token, user} = nextCookie(ctx);

        const pageProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx)) || {};

        // pageProps.token = token;
        // console.log("CMSApp initial props: ", {pageProps, token});
        return {pageProps, token, user: user ? JSON.parse(user) : null};
    }

    componentDidCatch(error, _errorInfo) {
        super.componentDidCatch(error, _errorInfo);
        console.error(error, _errorInfo);
        message.error(error.message);
    }

    render() {
        const {Component, pageProps, graphQLClient} = this.props;

        return (
            <React.Fragment>
                <Head>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css?family=Montserrat" />
                </Head>
                <ClientContext.Provider value={graphQLClient}>
                    <Component {...pageProps} />
                </ClientContext.Provider>
                <style jsx global>{`
                #nprogress {
                    pointer-events: none;
                }

                #nprogress .bar {
                    background: #fb5f1f;

                    position: fixed;
                    z-index: 999999;
                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 2px;
                }

                /* Fancy blur effect */
                #nprogress .peg {
                    display: block;
                    position: absolute;
                    right: 0px;
                    width: 100px;
                    height: 100%;
                    box-shadow: 0 0 10px #fb5f1f, 0 0 5px #80391b;
                    opacity: 1;

                    -webkit-transform: rotate(3deg) translate(0px, -4px);
                    -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
                }

                /* Remove these to get rid of the spinner */
                #nprogress .spinner {
                    display: block;
                    position: fixed;
                    z-index: 999999;
                    top: 15px;
                    right: 15px;
                }

                #nprogress .spinner-icon {
                    width: 22px;
                    height: 22px;
                    box-sizing: border-box;

                    border: solid 3px transparent;
                    border-top-color: #fb5f1f;
                    border-left-color: #ff631f;
                    border-radius: 50%;

                    -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
                }

                .nprogress-custom-parent {
                    overflow: hidden;
                    position: relative;
                }

                .nprogress-custom-parent #nprogress .spinner,
                .nprogress-custom-parent #nprogress .bar {
                    position: absolute;
                }

                @-webkit-keyframes nprogress-spinner {
                    0% {
                        -webkit-transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                    }
                }
                @keyframes nprogress-spinner {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            </React.Fragment>
        );
    }
}

export default withGraphQLClient(CMSApp);
