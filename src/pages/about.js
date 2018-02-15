import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

const ProjectSummary = ({ href, title, description, motive }) => (
  <article>
    <p>
      <a href={href}>{title}</a> - {description}
      <br />
      Worked on to {motive}
    </p>
  </article>
);

const Section = styled.section`
  text-align: center;
`;

const About = () => (
  <Section>
    <Helmet title="About" />
    <h1>Some projects I've worked on</h1>
    <ProjectSummary
      href="https://lineageos.org"
      title="LineageOS"
      description="aftermarket Android firmware to bring the newest Android to every device"
      motive="learn the Android OS stack and enhancing my devices"
    />
    <ProjectSummary
      href="https://github.com/zwliew/KawaiiFX"
      title="KawaiiFX"
      description="kawaii anime sound effects on a page"
      motive="try out Web Components"
    />
  </Section>
);

export default About;
