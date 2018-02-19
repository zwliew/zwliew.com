import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const Svg = styled.svg`
  width: 24px;
  height: 24px;

  :hover path {
    fill: teal;
  }
`;

const Icon = ({ d, to, href }) => {
  let link;
  if (to) {
    link = (
      <Link to={to}>
        <path d={d} />
      </Link>
    );
  } else {
    link = (
      <a href={href}>
        <path d={d} />
      </a>
    );
  }
  return <Svg>{link}</Svg>;
};

export default Icon;
