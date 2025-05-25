import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTiktok, FaEnvelope } from 'react-icons/fa';

const AboutUsContainer = styled.div`
  padding: 32px 16px;
  text-align: center;
  @media (max-width: 600px) {
    padding: 8vw 2vw 8vw 2vw;
    font-size: 15px;
  }
`;

const AboutUsTitle = styled.h2`
  color: #0052CC;
  margin-bottom: 18px;
  font-size: 2rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const AboutUsText = styled.p`
  font-size: 18px;
  color: #172B4D;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto 18px auto;
  max-width: 340px;
  text-align: left;
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    text-align: center;
    justify-content: center;
  }
`;

const InfoItem = styled.li`
  font-size: 17px;
  margin-bottom: 10px;
  color: #253858;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  @media (max-width: 600px) {
    justify-content: center;
    font-size: 16px;
  }
`;

const InfoLabel = styled.span`
  font-weight: 700;
  min-width: 70px;
  color: #0052CC;
`;

const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;
  margin: 28px 0 0 0;
  @media (max-width: 600px) {
    gap: 12px;
    margin: 18px 0 0 0;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  width: 100px;
  border-radius: 8px;
  background: #F4F5F7;
  color: #172B4D;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover {
    background: #DEEBFF;
    color: #0052CC;
    box-shadow: 0 4px 16px rgba(0,82,204,0.08);
  }
  @media (max-width: 600px) {
    width: 100px;
    font-size: 15px;
    padding: 10px 12px;
  }
`;

export default function AboutUs() {
  return (
    <AboutUsContainer>
      <AboutUsTitle>About Me</AboutUsTitle>
      <InfoList>
        <InfoItem><InfoLabel>Họ tên:</InfoLabel> Nguyễn Lương Khang</InfoItem>
      </InfoList>
      <SocialLinks>
        <SocialLink href="https://facebook.com/khangnek.251" target="_blank" rel="noopener noreferrer"><FaFacebook size={20}/> Facebook</SocialLink>
        <SocialLink href="https://github.com/khangnekk" target="_blank" rel="noopener noreferrer"><FaGithub size={20}/> Github</SocialLink>
        <SocialLink href="https://instagram.com/khangnek.251" target="_blank" rel="noopener noreferrer"><FaInstagram size={20}/> Instagram</SocialLink>
        <SocialLink href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter size={20}/> Twitter</SocialLink>
        <SocialLink href="https://tiktok.com/@khangnek.251" target="_blank" rel="noopener noreferrer"><FaTiktok size={20}/> TikTok</SocialLink>
        <SocialLink href="mailto:contact.khangfk@gmail.com" target="_blank" rel="noopener noreferrer"><FaEnvelope size={20}/> Email</SocialLink>
      </SocialLinks>
      <AboutUsText style={{marginTop:32, fontSize:15, color:'#6B778C'}}>Xem thêm tại <a href="https://linktr.ee/tuitenkhang" target="_blank" rel="noopener noreferrer" style={{color:'#0052CC', textDecoration:'underline'}}>linktr.ee/tuitenkhang</a></AboutUsText>
    </AboutUsContainer>
  );
} 