import React from "react";
import Layout from "../Layout";
import { graphql } from "gatsby";
import PageTitle from "../../PageTitle";
import styled from "styled-components";
import NotFoundPageContent from "../../Content/NotFoundPageContent";
require('../../../styles/wp.css');

type PostPageLayoutProps = {
  data: {
    multilangWpPage: {
      content: {
        rendered: string
      }
      title: {
        rendered: string
      }
      language: string
    }
  }
}

const Content = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

const PostPageLayout = (props: PostPageLayoutProps) => {

  const { data } = props;

  return (
    <Layout language={data.multilangWpPage.language}>
      <>
        <PageTitle>{data.multilangWpPage.title.rendered}</PageTitle>
        {
          (data.multilangWpPage.content.rendered)
            ? <Content dangerouslySetInnerHTML={{ __html: data.multilangWpPage.content.rendered }} />
            : <NotFoundPageContent />
        }
      </>
    </Layout>
  )
}

export default PostPageLayout

export const query = graphql`
query ($pageId: Int!, $language: LanguagesEnum) {
    multilangWpPage(pageId: $pageId, language: $language) {
      title {
        rendered
      }
      content {
        rendered
      }
      language
    }

    allMultilangWcProducts(params: {per_page: 1}, language: $language) {
      language
    }
  } 
`

