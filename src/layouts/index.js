import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Icon from "../components/Icon";

const Container = styled.main`
  margin-left: 10vmin;
  margin-right: 10vmin;
  font-family: Nunito, sans-serif;
`;

const Nav = styled.nav`
  float: right;
`;

const HeaderContainer = styled.header`
  padding: 1rem;
`;

const Header = () => (
  <HeaderContainer>
    <Icon to="/" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
    <Nav>
      <Icon
        to="/about"
        d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      />
      <Icon
        to="/blog"
        d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18"
      />
    </Nav>
  </HeaderContainer>
);

const Index = ({ children }) => (
  <Container>
    <Header />
    {children()}
  </Container>
);

export default Index;
