import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import GestionCompte from "./pages/gestionCompte/GestionCompte";
import Parrainage from "./pages/parrainage/Parrainage";
import RestaurantPage from "./pages/restaurantPage/RestaurantPage";
import ItemPage from "./pages/itemPage/ItemPage";
import HistoriqueCommande from "./pages/historiqueCommande/HistoriqueCommande";
import SuiviCommande from "./pages/suiviCommande/SuiviCommande";
import Connexion from "./pages/connexion/Connexion";
import Inscription from "./pages/inscription/Inscription";

import ListeCommandesLivreur from "./pages/listeCommandesLivreur/ListeCommandesLivreur";
import LivraisonLivreur from "./pages/livraisonCommande/LivraisonCommande"

import CommandesRestaurateur from "./pages/commandesRestaurateur/CommandesRestaurateur"
import GestionCommandeRestaurateur from "./pages/gestionCommandeRestaurateur/GestionCommandeRestaurateur"
import GestionMenuRestaurateur from "./pages/gestionMenu/GestionMenu"
import CreationMenuRestaurateur from "./pages/creationMenu/CreationMenu"
import GestionArticleRestaurateur from "./pages/gestionArticle/GestionArticle"
import CreationArticleRestaurateur from "./pages/creationArticle/CreationArticle"

import AdminCompte from "./pages/adminCompte/AdminCompte";
import GestionUtilisateurAdmin from "./pages/gestionUtilisateurAdmin/GestionUtilisateurAdmin"

import axios from 'axios';
import { useState, useEffect } from 'react';
import api from './api';  // 💡 Importation de ton fichier API
import GestionCommandeAdmin from "./pages/gestionCommandeAdmin/GestionCommandeAdmin";
import CommandeAdmin from "./pages/commandeAdmin/CommandeAdmin";


function App() {

  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/mon-compte" element={<GestionCompte />} />
        <Route path="/parrainage" element={<Parrainage />} />
        <Route path="/restaurant/:name" element={<RestaurantPage />} />
        <Route path="/restaurant/:name/:item" element={<ItemPage />} />
        <Route path="historique-commande" element={<HistoriqueCommande />} />
        <Route path="suivi-commande" element={<SuiviCommande />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/" element={<Connexion />} />
        
        <Route path="/liste-commandes-livreur" element={<ListeCommandesLivreur />} />
        <Route path="/livraison-livreur" element={<LivraisonLivreur />} />

        
        <Route path="/compte-admin" element={<AdminCompte />} />
        <Route path="/gestion-compte-admin" element={<GestionUtilisateurAdmin />} />
        <Route path="/gestioncommand-admin" element={<GestionCommandeAdmin />} />
        <Route path="/commande-admin" element={<CommandeAdmin />} />


        <Route path="/commandes-restaurateur" element={<CommandesRestaurateur />} />
        <Route path="/gestioncommande-restaurateur" element={<GestionCommandeRestaurateur />} />
        <Route path="/gestionmenu-restaurateur" element={<GestionMenuRestaurateur />} />
        <Route path="/creationmenu-restaurateur" element={<CreationMenuRestaurateur />} />
        <Route path="/gestionarticle-restaurateur" element={<GestionArticleRestaurateur />} />
        <Route path="/creationarticle-restaurateur" element={<CreationArticleRestaurateur />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;