import React from "react";
import styled from "styled-components";
import Header from "../components/Header";

const Container = styled.main`
  margin-left: 10vmin;
  margin-right: 10vmin;
  font-family: Nunito, sans-serif;
`;

const Index = ({ children }) => (
  <Container>
    <Header />
    {children()}
  </Container>
);

export default Index;
