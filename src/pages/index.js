import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import github from "./github.svg";
import email from "./email.svg";
import profile from "./profile.png";

const Link = styled.a`
  margin: 0.2rem;
`;

const SocialLink = ({ alt, href, img }) => (
  <Link href={href}>
    <img src={img} alt={alt} />
  </Link>
);

const ProfileImage = styled.img`
  border-radius: 50%;
  max-width: 30vmin;
  max-height: 30vmin;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;

const Index = () => (
  <Container>
    <Helmet title="Home" />
    <ProfileImage src={profile} />
    <h1>Hi, I'm zwliew.</h1>
    <section>
      <SocialLink href="https://github.com/zwliew" alt="GitHub" img={github} />
      <SocialLink href="mailto:zhaoweilie@gmail.com" alt="Email" img={email} />
    </section>
  </Container>
);

export default Index;
