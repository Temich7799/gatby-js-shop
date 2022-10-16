import React, { useContext } from "react"
import styled, { keyframes } from "styled-components";
import ImageSVG from "./ImageSVG";
import { LangContext } from "./Layouts/Layout";

const SlideFromUpAnimation = keyframes`
    0% {top: -500px; opacity: 0}
    100% {top: 0; opacity: 1}
`;

const SlideDownAnimation = keyframes`
    0% {top: 0; opacity: 1}
    100% {top: 50px; opacity: 0; visibility: hidden}
`;

const StyledLanguageSelector = styled.div<any>`

    @media (min-width: ${props => props.minDesktopWidth}px) {
        :hover {
            ul {
                visibility: visible;
                animation: ${SlideFromUpAnimation} 100ms;
            }
        }
    }

    padding-right: 10px;
    display: flex;
    align-items: center;
    border-radius: 25px;
    gap: 15px;
`;

const LanguagesList = styled.ul<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
        visibility: visible;
        flex-direction: row;
    }

    @media (min-width: ${props => props.minDesktopWidth}px) {
        animation: ${SlideDownAnimation} 100ms forwards;
    }
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: 8px;
`;

const Language = styled.li<any>`

    ${props => props.selected && `
        text-decoration: underline;
        order: -1;
    `};

    list-style: none;
    :hover {
        cursor: pointer
    }
`;

const LanguageSelector = () => {

    const languages = ['RU', 'UK', 'EN'];
    const { language, langPrefix } = useContext(LangContext);
    const selectedLanguage = language.toLocaleUpperCase();

    function onClickHandler(language: string) {

        const origin = document.location.origin;
        const newPrefix = language === 'RU' ? '' : `/${language}`.toLowerCase();
        const path = langPrefix !== '' ? '/' + document.location.pathname.split(langPrefix)[1] : document.location.pathname;
        document.location = origin + newPrefix + path;
    }

    return (
        <StyledLanguageSelector minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            <ImageSVG path="/svg/language.svg" width="25px" height="25px" />
            <LanguagesList minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
                {
                    languages.map((language: string, index: number) =>
                        language === selectedLanguage
                            ? <Language selected key={index}> {selectedLanguage}</Language>
                            : <Language onClick={() => onClickHandler(language)} key={index}> {language}</Language>
                    )
                }
            </LanguagesList>
        </StyledLanguageSelector >
    )
}

export default LanguageSelector;