import React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import Button from "../../Button";
import ProductPrice from "../ProductPrice";
import { PRODUCT_SKU } from "../../../languages/ru/languages";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { addToCartResolver } from "../../../graphql/vars/shoppingCartVar";
import useFetchedProducts from "../../../services/hooks/useFetchedProduct";
import InteractiveImage from "../../InteractiveImage";

const StyledProductThumb = styled.div`
    height: 320px;
    min-width: 225px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
        height: 240px;
        object-fit: cover;
    }
`;

const ProductImage = styled.div`
    position: relative;
`;

const ProductCaption = styled.div`
    font-family: 'Amatic SC';
    font-size: 20px;
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
        margin: 0;
    }
`;

type Product = {
    name: string
    price: string
    sku: string
    stock_quantity: number | null
    stock_status: string
    sale_price: string
    image: {
        alt: string
        src: string
    }
    categories: [
        {
            slug: string
        }
    ]
    wordpress_id: number
    quantity: number
}

type ProductProps = {
    data: Product
    absolutePath?: string
}

const ProductThumb = (props: ProductProps) => {

    const { data, absolutePath } = props;
    const { categories, image, wordpress_id } = data;
    if (data.sku == '') data.sku = wordpress_id.toString();

    const { loading: isDataLoading, data: fetchedData, isOutOfStock } = useFetchedProducts(data);

    function buttonOnClickHandler() {
        addToCartResolver(wordpress_id, data);
    }

    return (
        <StyledProductThumb>
            <ProductImage>
                {
                    absolutePath
                        ? <a href={absolutePath}>
                            <InteractiveImage>
                                <img src={image.src} alt={image.alt} />
                            </InteractiveImage>
                        </a>
                        : <Link to={`${categories[0].slug}-${data.sku}`}><img src={image.src} alt={image.alt} /></Link>
                }
            </ProductImage>
            <ProductCaption>
                <div>
                    <p>{PRODUCT_SKU}: {data.sku}</p>
                    <ProductPrice price={fetchedData && fetchedData.wpWcProduct.price} salePrice={fetchedData && fetchedData.wpWcProduct.sale_price} />
                </div>
                <div>
                    <Button id="shoppingCartButton" buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                        <ImageSVG path='/svg/add_to_cart.svg' height="25px" width="25px" />
                    </Button>
                </div>
            </ProductCaption>
        </StyledProductThumb >
    )
}

export default ProductThumb;