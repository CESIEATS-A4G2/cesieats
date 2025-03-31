import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import GestionCompte from "./pages/gestionCompte/GestionCompte";
import Parrainage from "./pages/parrainage/Parrainage";
import RestaurantPage from "./pages/restaurantPage/RestaurantPage";
import ItemPage from "./pages/itemPage/ItemPage";
import HistoriqueCommande from "./pages/historiqueCommande/HistoriqueCommande";
import SuiviCommande from "./pages/suiviCommande/SuiviCommande";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mon-compte" element={<GestionCompte />} />
        <Route path="/parrainage" element={<Parrainage />} />
        <Route path="/restaurant/:name" element={<RestaurantPage />} />
        <Route path="/restaurant/item" element={<ItemPage />} />
        <Route path="historique-commande" element={<HistoriqueCommande />} />
        <Route path="suivi-commande" element={<SuiviCommande />} />
      </Routes>
    </Router>
  );
}

export default App;

