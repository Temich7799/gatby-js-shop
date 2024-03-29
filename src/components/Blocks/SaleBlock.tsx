import { Link } from "gatsby";
import React, { useContext } from "react"
import { useFetchProducts } from "../../services/hooks/graphql/useFetchProducts";
import { LangContext } from "../Layouts/Layout";
import BlockContent from "./BlockContent";
import TileBlock from "./TileBlock"

const SaleBlock = () => {

    const { language } = useContext(LangContext);
    const { BLOCK_SALE_TITLE, BLOCK_SALE_DETAILS, MOBILE_HEADER_SUBMENU_SEE_ALL } = require(`../../languages/${language}/languages`);

    const { data } = useFetchProducts(language, { on_sale: true });

    return (
        <TileBlock color="#f4e77c">
            <BlockContent title={BLOCK_SALE_TITLE} count={data ? data.length : 0} iconPath={""} gridTemplateAreas={
                `
                    Icon Title Title Title"
                    "Count Count . ."
                    "Count Count Details Details"
                    "Count Count . .
                `}
            >
                <Link to="sale">{MOBILE_HEADER_SUBMENU_SEE_ALL}</Link>
                <p>⬅️ {BLOCK_SALE_DETAILS} %</p>
            </BlockContent>
        </TileBlock>
    )
}

export default SaleBlock;
