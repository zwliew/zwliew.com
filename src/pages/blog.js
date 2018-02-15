import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import styled from "styled-components";

const Card = styled.article`
  border-radius: 2px;
  display: inline-block;
  height: 10rem;
  margin: 1rem;
  padding: 1rem;
  position: relative;
  width: 10rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Post = ({ to, title, description }) => (
  <Link to={to}>
    <Card>
      {title}
      <br />
      {description}
    </Card>
  </Link>
);

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Blog = () => (
  <Section>
    <Helmet title="Blog" />
    <h1>Some thoughts</h1>
    <Post to="/blog/welcome" title="Welcome!" description="Hello!" />
  </Section>
);

export default Blog;
