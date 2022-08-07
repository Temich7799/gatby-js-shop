import React, { useEffect, useState } from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import Button from "../../Button";
import OrderedProducts from "./OrderedProducts";

const StyledOrderDetails = styled.form`
    /* other form styles are in <src/styles/wp.css> */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-color: #fefefe;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    h1 {
        font-size: smaller;
    }
     h4 {
        margin: 0;
        text-align: center;
    }
`;

const OrderFinal = styled.div`
    p {
        margin: 10px 0;
        text-align: center;
        font-size: 20px;
    }
    div{  
        display: flex;
        gap: 15px;
    }
`;

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string },
    product_id: number
    quantity: number
}

type Products = [Product];

const OrderDetails = () => {

    const [products, setProducts] = useState<Products | undefined>();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => setTotalPrice(calcTotalPrice(products)), [products]);
    useEffect(() => setProductsHook(), [totalPrice]);

    function setProductsHook(): void { setProducts(getProducts()) }

    function getProducts(): Products {
        let products;
        const getProducts = localStorage.getItem('ordered_products');
        if (getProducts) products = JSON.parse(getProducts);
        return products;
    }

    function calcTotalPrice(products: Products | undefined): number {
        let price = 0;
        products && products.forEach((product: Product) =>
            price = (parseInt(product.sale_price ? product.sale_price : product.price) + price) * product.quantity);
        return price;
    }

    return (
        <StyledOrderDetails id="order_details">
            <h4>Your Order</h4>
            <OrderedProducts setProductsHook={setProductsHook} data={products} />
            <OrderFinal>
                <h4>Total </h4>
                <p>{totalPrice} $</p>
                <div>
                    <Button onClick={(e: any) => e.preventDefault()}>Back to Shop</Button>
                    <Link to="/shopping_cart"><Button buttonStyle="accent">Make an Order</Button></Link>
                </div>
            </OrderFinal>
        </StyledOrderDetails>
    )
}

export default OrderDetails;