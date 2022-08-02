import React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import { getHeightAttribute } from "../../../services/attributes";
import ImageSVG from "../../ImageSVG";

const StyledProductThumb = styled.div`
    height: 280px;
    width: 165px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
        height: 220px;
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
        images: [{
            src: string
            alt: string
        }]
        categories: [
            { slug: string }
        ]
        attributes: [ProductAttribute]
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
                    <p>Price: <b>{data.price}</b>$</p>
                </div>
                {height != undefined && <HeightAttributeContainer><ImageSVG path='/svg/height.svg' height="100%" width="25px" /><p>{height.options[0]}</p></HeightAttributeContainer>}
            </ProductCaption>
        </StyledProductThumb>
    )
}

export default ProductThumb;