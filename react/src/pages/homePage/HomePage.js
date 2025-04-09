import React from "react";
import "./HomePage.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/SiteFooter";
import OffreSection from "../../components/offreSection/OffreSection";

function HomePage() {
  return (
    <div className="home-container">
      <Header role="User"/>
      <OffreSection />
      <Footer />
    </div>
  );
}

export default HomePage;