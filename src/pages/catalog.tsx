import { graphql } from "gatsby";
import React from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/Layout";
import CategoryThumb from "../components/Products/Thumbs/CategoryThumb";
import PageTitle from "../components/PageTitle";
import useMobile from "../services/hooks/useMobile";
import { CATALOG_PAGE_TITLE } from "../languages/uk/languages";

const Main = styled.main<any>`
  margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
  max-width: 1700px;
  margin: 0 auto;
  padding: 2.5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  column-gap: 25px;
  row-gap: 50px;
`

type CatalogProps = {
  data: {
    allWcProductsCategories: {
      edges: [
        {
          node: {
            image: [
              {
                alt: string
                src: string
              }
            ]
            slug: string
            name: string
            description: string
          }
        }
      ]
    }
  }
}

const CatalogPage = (props: CatalogProps) => {

  const { data } = props;

  const isMobile = useMobile();

  return (
      <Layout>
          <Main isMobile={isMobile}>
            <PageTitle>{CATALOG_PAGE_TITLE}</PageTitle>
            <Content>
              {
                data.allWcProductsCategories.edges.map((edge: any, index: number) => <CategoryThumb data={edge.node} key={index} />)
              }
            </Content>
          </Main>
      </Layout>
  )
}

export default CatalogPage;

export const query = graphql`
  query getAllCategories {
    allWcProductsCategories(filter: {products: {elemMatch: {stock_status: {eq: "instock"}, status: {eq: "publish"}}}}) {
      edges {
        node {
          image {
            alt
            src
          }
          slug
          name
          description
        }
      }
    }
  }
`;