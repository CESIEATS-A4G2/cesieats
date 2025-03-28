import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import GestionCompte from "./pages/gestionCompte/GestionCompte";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mon-compte" element={<GestionCompte />} />
      </Routes>
    </Router>
  );
}

export default App;

