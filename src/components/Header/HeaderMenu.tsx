import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const StyledMenu = styled.nav`
min-width: 700px;
display: flex;
justify-content: flex-start;
align-items: center;
a{
    padding: 3px 15px 1px;
    &:hover {
        font-weight: 700;
    }
}
`;

const Menu = () => {

  const data = useStaticQuery(graphql`
    query HeaderMenu {
      wpMenu(id: {eq: "dGVybTozMQ=="}) {
        menuItems {
          nodes {
            label
            url
          }
        }
      }
    } 
  `);

  const links = data.wpMenu.menuItems.nodes;
  console.log(links);
  return (
    <StyledMenu>
      {links.map((link: any) => (links.indexOf(link) == Math.floor(links.length / 2))
        ?
        <>
          <Link to="https://home">
            <StaticImage src="../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
          </Link>
          <Link to={link.url}>{link.label}</Link>
        </>
        :
        <Link to={link.url}>{link.label}</Link>)}
    </StyledMenu>
  )
}

export default Menu