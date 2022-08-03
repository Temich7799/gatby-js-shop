import React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import { getHeightAttribute } from "../../../services/attributes";
import ImageSVG from "../../ImageSVG";
import ProductBuy from "../ProductAbout/ProductBuy";
import Button from "../../Button";
import { addToCart } from "../../../services/addToCart";
import ProductPrice from "../ProductPrice";

const StyledProductThumb = styled.div`
    height: 320px;
    width: 225px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const HeightAttributeContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

type ProductAttribute = {
    options: [string]
    name: string
}

type ProductProps = {
    data: {
        slug: string
        sku: string
        price: string
        sale_price: string
        images: [{
            src: string
            alt: string
        }]
        categories: [
            { slug: string }
        ]
        attributes: [ProductAttribute]
        wordpress_id: number
    }
}

const ProductThumb = (props: ProductProps) => {

    const { data } = props;

    const height = getHeightAttribute(data.attributes);

    return (
        <StyledProductThumb>
            <ProductImage>
                <Link to={`${data.categories[0].slug}-${data.sku}`}>
                    <img src={data.images[0].src} alt={data.images[0].alt} />
                </Link>
            </ProductImage>
            <ProductCaption>
                <div>
                    <p>SKU: {data.sku}</p>
                    <ProductPrice price={data.price} salePrice={data.sale_price} />
                </div>
                <div>
                    <Button buttonSize="shrink" buttonStyle="transparent" onClick={() => addToCart(data.wordpress_id)}>
                        <ImageSVG path="/svg/add_to_cart.svg" height="25px" width="25px" />
                    </Button>
                </div>
            </ProductCaption>
        </StyledProductThumb>
    )
}

export default ProductThumb;