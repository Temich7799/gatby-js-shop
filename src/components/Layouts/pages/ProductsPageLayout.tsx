import React from "react";
import Layout from "../Layout";
import { graphql } from "gatsby";
import ProductsPageContent from "../../Content/ProductsPageContent";

type ProductsPageLayoutProps = {
  data: {
    allWcProducts: {
      edges: [Product]
    }
    allMultilangWcProducts: [
      {
        language: string
      }
    ]
  }
}

type Product = {
  node: {
    status: string
    stock_status: string
    categories: [
      {
        wordpress_id: number
      }
    ]
    images: [
      {
        alt: string
        localFile: object | any
      }
    ]
    wordpress_id: number
  }
}

const ProductsPageLayout = (props: ProductsPageLayoutProps) => {

  const { data } = props;

  const gatsbyImages = new Map<number, string>();

  data.allWcProducts.edges.forEach((edge: Product) => {
    if (edge.node.status == 'publish' || edge.node.stock_status == 'instock') {
      const localFile = edge.node.images[0].localFile;
      localFile && localFile.childImageSharp && gatsbyImages.set(edge.node.wordpress_id, localFile.childImageSharp.gatsbyImageData.images.fallback.src);
    }
  });

  return (
    <Layout language={data.allMultilangWcProducts[0].language}>
      <>
        {
          data.allWcProducts.edges.length > 0 && <ProductsPageContent gatsbyImages={gatsbyImages} categoryId={data.allWcProducts.edges[0].node.categories[0].wordpress_id.toString()} />
        }
      </>
    </Layout>
  )
}

export default ProductsPageLayout

export const query = graphql`
  query getProductImages($categoryId: Int, $language: LanguagesEnum) {

    allMultilangWcProducts(params: {per_page: 1}, language: $language) {
      language
    }

    allWcProducts(filter: {categories: {elemMatch: {wordpress_id: {eq: $categoryId}}}}){
      edges {
        node {
          status
          stock_status
          wordpress_id
          categories {
            wordpress_id
          }
          images {
            localFile {
              childImageSharp {
                gatsbyImageData(webpOptions: {quality: 85}, height: 240, formats: WEBP)
              }
            }
          }
        }
      }
    }
  }    
`;
