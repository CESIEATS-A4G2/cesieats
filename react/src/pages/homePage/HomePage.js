import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/SiteFooter";
import OffreSection from "../../components/offreSection/OffreSection";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRoleAndRedirect = async () => {
      try {
        
        const res = await axios.get("http://localhost:8080/authenticate", { withCredentials: true });
        const role = res.data.user.role;

        console.log(role);
        switch (role) {
          case "DeliveryMan":
            navigate("/liste-commandes-livreur");
            break;
          case "Restaurateur":
            navigate("/commandes-restaurateur");
            break;
          case "Admin":
            navigate("/gestion-compte-admin");
            break;
          default:
            // reste ici
            break;
        }
      } catch (error) {
        console.error("Erreur d'authentification :", error);
      }
    };

    checkRoleAndRedirect();
  }, [navigate]);

  return (
    <div className="home-container">
      <Header role="User" />
      <OffreSection />
      <Footer />
    </div>
  );
}

export default HomePage;
