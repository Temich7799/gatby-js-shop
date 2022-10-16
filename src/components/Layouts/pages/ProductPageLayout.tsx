import React from "react";
import Layout from "../Layout";
import { graphql } from "gatsby";
import ProductPageContent from "../../Content/ProductPageContent";

type ProductPageLayoutProps = {
    data: {
        multilangWcProduct: MultilangProduct
        wcProducts: Product
    }
}
interface MultilangProduct {
    name: string
    description: string
    attributes: [
        {
            options: [string]
            name: string
        }
    ]
    language: string
}
interface Product extends MultilangProduct {
    sku: string
    price: string
    sale_price: string
    wordpress_id: number
    id: string
    stock_quantity: number | null
    stock_status: string
    related_products: [Product]
    images: [
        {
            src: string
            alt: string
            localFile: object | any
        }
    ]
    image: {
        src: string
        alt: string
    }
    categories: [
        {
            slug: string
        }
    ]
}

const ProductPageLayout = (props: ProductPageLayoutProps) => {

    const { data } = props;

    const wcProduct = {
        ...data.wcProducts,
        ...data.multilangWcProduct,
        id: data.wcProducts.wordpress_id.toString(),
        image: {
            src: data.wcProducts.images[0].src,
            alt: data.wcProducts.images[0].alt
        }
    }

    const gatsbyImages = new Map<number, string>();

    data.wcProducts.related_products.forEach((relatedProduct: object | any) => {
        if ((relatedProduct.stock_quantity !== null && relatedProduct.stock_quantity > 0) || relatedProduct.stock_status == 'instock') {
            gatsbyImages.set(relatedProduct.wordpress_id, relatedProduct.images[0].localFile.childImageSharp.gatsbyImageData.images.fallback.src);
        }
    });

    return (
        <Layout language={data.multilangWcProduct.language}>
            <ProductPageContent data={wcProduct} gatsbyImages={gatsbyImages} />
        </Layout >
    )
}

export default ProductPageLayout

export const query = graphql`
  query getProduct($productId: Int!, $language: LanguagesEnum) {

    multilangWcProduct(productId: $productId, language: $language) {
        name
        description
        language
        attributes {
            options
            name
        }
    }

    wcProducts(wordpress_id: {eq: $productId}) {
        sku
        price
        sale_price
        wordpress_id
        related_products {
            status
            stock_status
            wordpress_id
            images {
                alt
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            webpOptions: {quality: 85}
                            height: 240
                        )
                    }
                }
            }
            categories {
                slug
            }
        }
        images {
            src
            alt
            localFile {
                childImageSharp {
                    gatsbyImageData(
                        webpOptions: {quality: 85}
                        height: 100
                        width: 100
                        transformOptions: {cropFocus: CENTER}
                    )
                }
            }
        }
        categories {
            slug
        }
    }
}`;
