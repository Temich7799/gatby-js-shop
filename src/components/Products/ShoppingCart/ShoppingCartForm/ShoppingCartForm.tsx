import React, { forwardRef } from "react"
import styled from "styled-components"
import Delivery from "./Delivery/Delivery";
import ClientContacts from "./ClientContacts";

const StyledShoppingCartForm = styled.form`
    width: 90vw;
    background-color: hsl(0, 0%, 99.6078431372549%);
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    input, select {
        width: 90%;
        height: 24px;
        padding: 5px 15px;
        border: 1px solid #818a91;
        border-radius: 3.5px;
        vertical-align: middle;
        :invalid { border:#de8b8b 1px solid; outline: none}
        :valid { border:#8bde8e 1px solid; outline: none}
    }
    select {
        height: 36px;
        width: 97.5%;;
        padding: 0 10px;
        margin: 5px 0;
    }
    label {
        font-family: "Comfortaa";
        font-size: 16px;
        margin-bottom: 8px;
        color:#393939
    }
    input, textarea, select {:focus { border:#8BDEC6 1px solid; outline: none} }
    /* other form styles are in <src/styles/wp.css> */
`;

const ShoppingCartForm = forwardRef((props: any, ref: any) => {

    return (
        <StyledShoppingCartForm ref={ref} id="order_form">
            <ClientContacts />
            <Delivery />
        </StyledShoppingCartForm >
    )
})

export default ShoppingCartForm;