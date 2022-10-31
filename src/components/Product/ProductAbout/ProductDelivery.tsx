import React, { useContext } from "react"
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components"
import { LangContext } from "../../Layouts/Layout";

const StyledProductDelivery = styled.div`
    display: flex;
`;

const DeliveryAbout = styled.div`
    display: flex;
    width: 100%;
    margin: 7% 0;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
`;

const DeliveryIcons = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 15px;
`;

const ProductDelivery = () => {

    const { language } = useContext(LangContext);
    const { DELIVERY_ABOUT_AFTERPAY_INFO, DELIVERY_ABOUT_DELIVERY_INFO } = require(`../../../languages/${language}/languages`);

    return (
        <StyledProductDelivery>
            <DeliveryAbout>
                <a>{DELIVERY_ABOUT_DELIVERY_INFO}</a>
                <a>{DELIVERY_ABOUT_AFTERPAY_INFO}</a>
            </DeliveryAbout>
            <DeliveryIcons>
                <StaticImage src="../../../images/delivery/nova_poshta.svg" alt="nova-poshta-icon" width={30} height={30} layout="fixed" placeholder="blurred" />
                <StaticImage src="../../../images/delivery/ukrposhta.svg" alt="ukrposhta-icon" width={30} height={30} layout="fixed" placeholder="blurred" />
            </DeliveryIcons>
        </StyledProductDelivery>
    )
}

export default ProductDelivery;