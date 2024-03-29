import React, { useContext } from "react";
import ImageSVG from "../ImageSVG";
import { LangContext } from "../Layouts/Layout";
import Button from "./Button";

type ProductBuyButtonProps = {
    onClickHandler: Function
    isDataLoading: boolean
    isOutOfStock: boolean
}

const ProductBuyButton = (props: ProductBuyButtonProps) => {

    const { language } = useContext(LangContext);
    const { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } = require(`../../languages/${language}/languages`);

    const { onClickHandler, isDataLoading, isOutOfStock } = props;

    return (
        <Button onClick={onClickHandler} disabled={isDataLoading || isOutOfStock}>
            {
                isOutOfStock
                    ? PRODUCT_OUT_OF_STOCK_BUTTON_TITLE
                    : PRODUCT_BUY_BUTTON_TITLE
            }
            <ImageSVG path="/svg/cart/add_to_cart.svg" height="25px" width="25px" />
        </Button>
    )
}

export default ProductBuyButton;
