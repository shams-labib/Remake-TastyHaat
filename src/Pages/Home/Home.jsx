import React from "react";
import TopSlider from "../Hero/Slider/TopSlider";
import Hero from "../Hero/Hero";
import WhyChooseUs from "../Hero/WhyChooseUs/WhyChooseUs";
import MenuCards from "./MenuCards";
import Contact from "./Contact";
import About from "./About";
import TeamSection from "../Team Member/TeamSection ";
import TopSellerBurgers from "../TopBurger/TopBurger";

const Home = () => {
  return (
    <div>
      <TopSlider></TopSlider>
      <MenuCards></MenuCards>
      <TopSellerBurgers></TopSellerBurgers>
      <Hero></Hero>
      <About></About>
      <TeamSection></TeamSection>
      <WhyChooseUs></WhyChooseUs>
      <Contact></Contact>
    </div>
  );
};

export default Home;
