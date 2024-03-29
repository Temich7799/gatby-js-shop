import React from "react"
import styled from "styled-components"
import Delivery from "./Delivery/Delivery";
import ClientContacts from "./ClientContacts";
import { useShoppingCartVar } from "../../../services/hooks/apollo_vars/useShoppingCartVar";
import { useSendOrder } from "../../../services/hooks/useSendOrder";

type ShoppingCartFormProps = {
    setters: {
        setOrderDetailsData: React.Dispatch<React.SetStateAction<object>>
        setIsOrderSending: React.Dispatch<React.SetStateAction<boolean>>
    }
}

const StyledShoppingCartForm = styled.form<any>`
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
        font-family: "Didact Gothic";
        font-size: 16px;
        margin-bottom: 8px;
        color:#393939
    }
    input, textarea, select {:focus { border:#9ed6e4 1px solid; outline: none} }
    /* other form styles are in <src/styles/wp.css> */
`;

const ShoppingCartForm = (props: ShoppingCartFormProps) => {

    const { setIsOrderSending, setOrderDetailsData } = props.setters;

    const { data: orderedProducts }: any = useShoppingCartVar();
    const { send: sendOrder } = useSendOrder();

    function formOnSubmitHandler(onSubmitEvent: any) {

        onSubmitEvent.preventDefault();

        setIsOrderSending(true);

        sendOrder(onSubmitEvent.target, orderedProducts)
            .then((response) => {
                setOrderDetailsData(response);
                setIsOrderSending(false);
            })
    }

    return (
        <StyledShoppingCartForm onSubmit={(e: any) => { formOnSubmitHandler(e) }} id="order_form">
            <ClientContacts />
            <Delivery />
        </StyledShoppingCartForm >
    )
}

export default ShoppingCartForm;