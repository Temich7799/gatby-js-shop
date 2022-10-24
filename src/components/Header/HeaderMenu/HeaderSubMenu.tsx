import { Link } from "gatsby";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import useMobile from "../../../services/hooks/useMobile";
import toogle from "../../../services/toogle";
import { MenuItemType } from "../../../types/MenuItemType";
import { LangContext } from "../../Layouts/Layout";
import SubMenuIcon from "./SubMenuIcon";

type HeaderSubMenuProps = {
    data: MenuItemType | any
}

const SubMenuTitle = styled.div<any>`
    height: 25px;
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: ${props => props.minDesktopWidth}px) {
        position: relative;
        left: 5px;
        width: fit-content;
        margin: 0 auto;
    }
`;

const SubMenuItems = styled.ul<any>`

    font-family: "Didact Gothic";
    display: ${props => props.isSubMenuOpened ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    list-style: none;

    @media (min-width: ${props => props.minDesktopWidth}px) {
        position: absolute;
        top: 55px;
        width: fit-content;
        align-items: flex-start;
        min-height: 50px;
        padding: 1%;
        font-size: 16px;
        font-weight: normal !important;
        background-color: #fefefe;
        box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
        z-index: 1000;
    }

    @media (max-width: ${props => props.minDesktopWidth}px) {
        max-height: 200px;
        margin: 5px 0;
        padding: 0;
        padding-top: 20px;
        justify-content: center;
        gap: 15px;
        font-size: 16px;
        ::-webkit-scrollbar { display: none }
        overflow-y: scroll;
    }
`;

const SubMenuItem = styled.li`
    margin-bottom: 5px;
    text-shadow: none;
    @media (hover: hover) and (pointer: fine) {
        :hover {
            text-shadow: 0.25px 0 0 currentColor;
        }
    }
`;

const HeaderSubMenu = (props: HeaderSubMenuProps) => {

    const { language, langPrefix } = useContext(LangContext);
    const { MOBILE_HEADER_SUBMENU_SEE_ALL } = require(`../../../languages/${language}/languages`);

    const { data } = props;

    const [isSubMenuOpened, setIsSubMenuOpened] = useState<boolean>(false);

    const isMobile = useMobile();

    const ref = useRef<any>();

    function onMouseOverHandler(): void {
        setIsSubMenuOpened(true);
    }

    function onMouseLeaveHandler(mouseLeaveEvent: any): void {
        mouseLeaveEvent.relatedTarget !== ref.current && setIsSubMenuOpened(false)
    }

    function onClickHandler(): void {
        setIsSubMenuOpened(toogle(isSubMenuOpened));
    }

    return (
        <>
            {
                isMobile
                    ?
                    <SubMenuTitle minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH} onClick={() => onClickHandler()} >
                        {data.title}
                        <SubMenuIcon isOpened={isSubMenuOpened} />
                    </SubMenuTitle>
                    :
                    <Link to={data.path}>
                        <SubMenuTitle onMouseOver={() => onMouseOverHandler()} onMouseLeave={(e: any) => onMouseLeaveHandler(e)}>
                            {data.title}
                            <SubMenuIcon isOpened={isSubMenuOpened} />
                        </SubMenuTitle>
                    </Link>

            }
            {
                <SubMenuItems ref={ref} isSubMenuOpened={isSubMenuOpened} minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH} onMouseLeave={(e: any) => onMouseLeaveHandler(e)}>
                    {
                        isMobile &&
                        <SubMenuItem>
                            <Link to={data.path}>{MOBILE_HEADER_SUBMENU_SEE_ALL}</Link>
                        </SubMenuItem>
                    }
                    {
                        data.child_items.map((item: MenuItemType, index: number) =>
                            <SubMenuItem key={index}>
                                <Link to={langPrefix ? '/' + langPrefix.replace(/\/+$/, '') + item.path : item.path}>
                                    {item.title}
                                </Link>
                            </SubMenuItem>
                        )
                    }
                </SubMenuItems>
            }
        </>

    )
}

export default HeaderSubMenu;