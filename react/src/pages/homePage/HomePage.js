import React from "react";
import "./HomePage.css";

// import SearchBar from "../../components/SearchBar/SearchBar";
// import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import DishCard from "../../components/DishCard/DishCard";
// import BottomNav from "../../components/BottomNav/BottomNav";
import Header from "../../components/header/TopNavBar";
import Footer from "../../components/footer/SiteFooter";
import OffreSection from "../../components/offreSection/OffreSection";


function HomePage() {
  return (
    <div className="home-container">
      <Header />
      <OffreSection />
      <OffreSection />
      <OffreSection />
      <Footer />
    </div>
  );
}


export default HomePage;