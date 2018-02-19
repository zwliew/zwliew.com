import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import styled from "styled-components";

const Date = styled.p`
  color: #757575;
  font-size: 0.8rem;
`;

const Post = ({ to, date, title, children }) => (
  <article>
    <Link to={to}>
      <h3>{title}</h3>
      {children}
      <Date>Posted on {date}</Date>
      <hr />
    </Link>
  </article>
);

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Blog = ({ data }) => (
  <Section>
    <Helmet title="Blog" />
    <h1>Some thoughts</h1>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Post
        key={node.id}
        title={node.frontmatter.title}
        date={node.frontmatter.date}
        to={node.fields.slug}
      >
        {node.excerpt}
      </Post>
    ))}
  </Section>
);

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Blog;
