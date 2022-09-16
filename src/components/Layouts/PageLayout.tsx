import React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import PageTitle from "../PageTitle";
import styled from "styled-components";
import useMobile from "../../services/hooks/useMobile";
import { Main } from "../../styles/Main";
require('../../styles/wp.css');

const Content = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

type PageProps = {
  data: {
    wpPage: {
      content: string
      title: string
    }
  }
}

const PageLayout = (props: PageProps) => {

  const { data } = props;

  const isMobile = useMobile();

  return (
    <Layout>
      <Main isMobile={isMobile}>
        <PageTitle>{data.wpPage.title}</PageTitle>
        {(data.wpPage.content) ? <Content dangerouslySetInnerHTML={{ __html: data.wpPage.content }} /> : '404'}
      </Main>
    </Layout>
  )
}

export default PageLayout

export const query = graphql`
query ($slug: String!) {
    wpPage(slug: {eq: $slug}) {
      content
      title
    }
  } 
`


