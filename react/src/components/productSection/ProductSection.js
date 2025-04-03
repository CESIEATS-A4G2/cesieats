import React from "react";
import ProductCard from "../productCard/ProductCard";
import wrap from "../../resources/images/wrap.png"; 
import nuggets from "../../resources/images/nuggets.png"; 
import doubleCheese from "../../resources/images/doubleCheese.png"; 
import frites from "../../resources/images/frites.png"; 
import "./ProductSection.css";

function ProductSection() {
  const products = [
    {
      name: "P'TIT WRAP RANCH",
      price: "4,00 €",
      image: wrap,
      description: "Wrap avec ranch et crudités",
      optionsLabel: "SAUCE",
      options: ["SAUCE BBQ", "SAUCE RANCH", "SANS SAUCE"]
    },
    {
      name: "6 CHICKEN McNUGGETS™",
      price: "7,60 €",
      image: nuggets,
      description: "6 spécialités panées au poulet",
      optionsLabel: "SAUCE",
      options: ["SAUCE BIG MAC™", "SAUCE BIG TASTY", "SANS SAUCE", "LA SAUCE CREAMY DELUXE"]
    },
    {
      name: "DOUBLE CHEESE",
      price: "6,50 €",
      image: doubleCheese,
      description: "Burger double steak et fromage",
      optionsLabel: "FROMAGE",
      options: ["FROMAGE CLASSIQUE", "FROMAGE CHEDDAR", "SANS FROMAGE"]
    },
    {
      name: "PETITE FRITE",
      price: "3,90 €",
      image: frites,
      description: "Portion de frites croustillantes",
      optionsLabel: "SALAISON",
      options: ["SANS SEL", "SEL CLASSIQUE"]
    },
  ];

  return (
    <div className="product-section">
      <h2>NOS PETITES FAIMS</h2>
      <div className="product-list">
        {products.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.description}
            optionsLabel={item.optionsLabel}
            options={item.options}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
