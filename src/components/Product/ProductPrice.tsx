import React, { useContext } from "react"
import styled from "styled-components"
import { LangContext } from "../Layouts/Layout";
import LoadingSpinner from "../LoadingBars/LoadingSpinner";

type ProductPriceProps = {
    price: string | undefined
    salePrice: string | undefined | null
    isPriceLoading?: boolean
    showTitle?: boolean
}

const StyledProductPrice = styled.div<any>`
    text-align: center;
    ${props => props.showTitle && `
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
    `} 
    p {
        margin: 0;
    }
`;

const OldPrice = styled.s`
    color: #8a8a8a;
    font-size: smaller;
`;

const SalePrice = styled.span`
    color: #da4b4b;
    font-size: larger;
    font-weight: bolder;
`;

const ProductPrice = (props: ProductPriceProps) => {

    const { language } = useContext(LangContext);
    const { PRODUCT_PRICE_TITLE, PRODUCT_PRICE_EMPTY, CURRENCY } = require(`../../languages/${language}/languages`);

    let { price, salePrice, isPriceLoading = false, showTitle = true } = props;

    const emptyPrice = price === '' ? PRODUCT_PRICE_EMPTY : undefined;

    return (
        <StyledProductPrice showTitle={showTitle}>
            {
                showTitle && <p>{`${PRODUCT_PRICE_TITLE}:`}</p>
            }
            {
                isPriceLoading
                    ? <LoadingSpinner size="15%" />
                    :
                    salePrice && salePrice.length > 0
                        ? <p><OldPrice>{!emptyPrice ? price : emptyPrice}{" "}</OldPrice><SalePrice>{" "}{salePrice}</SalePrice> {!emptyPrice && CURRENCY}</p>
                        : <p>{!emptyPrice ? price : emptyPrice} {!emptyPrice && CURRENCY}</p>

            }
        </StyledProductPrice>
    )
}

export default ProductPrice;