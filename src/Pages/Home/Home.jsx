import React, { useEffect, useState } from "react";
import TopSlider from "../Hero/Slider/TopSlider";
import Hero from "../Hero/Hero";
import WhyChooseUs from "../Hero/WhyChooseUs/WhyChooseUs";
import MenuCards from "./MenuCards";
import Contact from "./Contact";
import About from "./About";
import TeamSection from "../Team Member/TeamSection ";
import TopSellerBurgers from "../TopBurger/TopBurger";
import FloatingActionButtons from "../../Components/FloatingContactButtons";
import DeliveryCities from "../DeliveryCities/DeliveryCities";
import Coverage from "../Coverage/Coverage";

const Home = () => {
  const [coverageData, setCoverageData] = useState([]);

  useEffect(() => {
    fetch("/serviceCenter.json")
      .then((res) => res.json())
      .then((data) => setCoverageData(data))
      .catch((err) => console.error("Error loading service centers:", err));
  }, []);
  return (
    <div>
      <TopSlider></TopSlider>
      <MenuCards></MenuCards>
      <TopSellerBurgers></TopSellerBurgers>
      <Hero></Hero>
      <Coverage coverageData={coverageData} />
      <DeliveryCities />
      <About></About>
      <WhyChooseUs></WhyChooseUs>
      <TeamSection></TeamSection>
      <Contact></Contact>
      <FloatingActionButtons />
    </div>
  );
};

export default Home;
