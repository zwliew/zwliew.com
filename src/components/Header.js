import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const HeaderLinkImage = styled.svg`
  width: 24px;
  height: 24px;

  path:hover {
    fill: teal;
  }
`;

const HeaderLink = ({ to, children }) => (
  <Link to={to}>
    <HeaderLinkImage viewBox="0 0 24 24">{children}</HeaderLinkImage>
  </Link>
);

const Nav = styled.nav`
  float: right;
`;

const Container = styled.header`
  padding: 1rem;
`;

const Header = () => (
  <Container>
    <HeaderLink to="/">
      <path fill="" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
    </HeaderLink>
    <Nav>
      <HeaderLink to="/about">
        <path
          fill="#000054"
          d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        />
      </HeaderLink>
      <HeaderLink to="/blog">
        <path
          fill="#000054"
          d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18"
        />
      </HeaderLink>
    </Nav>
  </Container>
);

export default Header;
