import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import GestionCompte from "./pages/gestionCompte/GestionCompte";
import Parrainage from "./pages/parrainage/Parrainage";
import RestaurantPage from "./pages/restaurantPage/RestaurantPage";
import ItemPage from "./pages/itemPage/ItemPage";
import HistoriqueCommande from "./pages/historiqueCommande/HistoriqueCommande";
import SuiviCommande from "./pages/suiviCommande/SuiviCommande";
import Connexion from "./pages/connexion/Connexion"
import Inscription from "./pages/inscription/Inscription"
import ListeCommandesLivreur from "./pages/listeCommandesLivreur/ListeCommandesLivreur"
import LivraisonLivreur from "./pages/livraisonCommande/LivraisonCommande"

function App() {
  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/mon-compte" element={<GestionCompte />} />
        <Route path="/parrainage" element={<Parrainage />} />
        <Route path="/restaurant/:name" element={<RestaurantPage />} />
        <Route path="/restaurant/item" element={<ItemPage />} />
        <Route path="historique-commande" element={<HistoriqueCommande />} />
        <Route path="suivi-commande" element={<SuiviCommande />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/" element={<Connexion />} />

        <Route path="/liste-commandes-livreur" element={<ListeCommandesLivreur />} />
        <Route path="/livraison-livreur" element={<LivraisonLivreur />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

