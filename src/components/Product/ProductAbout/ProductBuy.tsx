import React from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../../languages/ru/languages";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";
import { addToCartResolver } from "../../../graphql/vars/shoppingCartVar";
import useFetchedProducts from "../../../services/hooks/useFetchedProduct";

const StyledProductBuy = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 10px 0;
`;

type ProductBuyProps = {
    data: {
        name: string
        slug: string
        price: string
        stock_quantity: number | null
        sale_price: string
        sku: string
        images: [{
            alt: string
            localFile: any
        }]
        wordpress_id: number
        quantity: number
    }
}

const ProductBuy = (props: ProductBuyProps) => {

    const { data } = props;

    const { loading: isDataLoading, data: fetchedData, isOutOfStock } = useFetchedProducts(data);

    function buttonOnClickHandler() {
        addToCartResolver(data.wordpress_id, data);
    }

    return (
        <StyledProductBuy>
            <ProductPrice price={fetchedData && fetchedData.wpWcProduct.price} salePrice={fetchedData && fetchedData.wpWcProduct.sale_price} />
            <Button id="shoppingCartButton" onClick={buttonOnClickHandler} disabled={isDataLoading || isOutOfStock}>
                <>
                    {
                        isOutOfStock
                            ? PRODUCT_OUT_OF_STOCK_BUTTON_TITLE
                            : PRODUCT_BUY_BUTTON_TITLE
                    }
                    <ImageSVG path="/svg/add_to_cart.svg" height="25px" width="25px" />
                </>
            </Button>
        </StyledProductBuy >
    )
}

export default ProductBuy;