import Link from "next/link";
import getConfig from 'next/config'
import {Button, PageHeader, Typography} from "antd";
import React, {Fragment} from "react";
import CommonLayout from "../components/layout/CommonLayout";
import PageWrapper from "../components/common/PageWrapper";
import NavHeader from "../components/layout/header/DefaultNavHeader";
import DefaultNavs from "../constants/DefaultNavs";

const { Title, Paragraph } = Typography;
const {publicRuntimeConfig} = getConfig();
const {ROOT_PATH} = publicRuntimeConfig;

let PAGE_TITLE;
PAGE_TITLE = "Home";

const pageHeader = <PageHeader title={PAGE_TITLE} subTitle="This is a starter project with nextjs, antd and graphql"
  extra={<Link href={ROOT_PATH}><Button type="primary">Sample Button</Button></Link>} />;

const Home = () => {
    return (
      <CommonLayout navs={DefaultNavs} navHeader={<NavHeader />}>
        <PageWrapper
          pageHeader={pageHeader}
            >
          <Fragment>
            <Title level={3}>Hello World!</Title>
            <Paragraph>
                        Hello from the nextjs-antd-graphql-starter app!
            </Paragraph>
          </Fragment>

        </PageWrapper>
      </CommonLayout>
    )
};

export default Home;
