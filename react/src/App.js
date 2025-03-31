import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import Connexion from "./pages/connexion/Connexion";
import GestionCompte from "./pages/gestionCompte/GestionCompte";
import Inscription from "./pages/inscription/Inscription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/mon-compte" element={<GestionCompte />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </Router>
  );
}

export default App;

