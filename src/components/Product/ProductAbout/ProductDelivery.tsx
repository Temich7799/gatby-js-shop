import * as React from "react"
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";

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
    return (
        <StyledProductDelivery>
            <DeliveryAbout>
                <a>условия доставки</a>
                <a>наложенный платеж</a>
            </DeliveryAbout>
            <DeliveryIcons>
                <ImageSVG path='/svg/nova_poshta.svg' height="35px" width="35px" />
                <ImageSVG path='/svg/ukrposhta.svg' height="35px" width="35px" />
                <ImageSVG path='/svg/justin_post.svg' height="35px" width="35px" />
            </DeliveryIcons>
        </StyledProductDelivery>
    )
}

export default ProductDelivery;