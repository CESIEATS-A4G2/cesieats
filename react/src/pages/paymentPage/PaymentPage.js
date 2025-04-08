import React, { useState } from "react";
import "./PaymentPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api";

function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const total = location.state?.total || 0; // Récupère le total depuis l'URL, sinon 0 par défaut

    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    
    const handlePayment = async (e) => {
        e.preventDefault();
    
        try {
            await api.createOrder("ACC000001"); // Appel API sans gérer ici le .then() et .catch()
            alert("🎉 Félicitations ! Vous avez payé !");
            navigate("/home"); // Retourne à la page d'accueil après le paiement
        } catch (error) {
            console.error("Erreur lors de la création de la commande :", error);
        }
    };
    

    return (
        <div className="payment-page">
            <form className="payment-form" onSubmit={handlePayment}>
                <h2>Ajouter une Méthode de Paiement</h2>
                <p>Montant total à payer : <strong>{total} $US</strong></p>

                <label>Nom du titulaire de la carte</label>
                <input 
                    type="text" 
                    placeholder="Entrez le nom du titulaire de la carte" 
                    value={cardHolderName} 
                    onChange={(e) => setCardHolderName(e.target.value)} 
                />

                <label>Détails de la carte</label>
                <div className="card-details">
                    <input 
                        type="text" 
                        placeholder="Numéro de carte" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="MM/AA" 
                        value={expiryDate} 
                        onChange={(e) => setExpiryDate(e.target.value)} 
                    />
                </div>

                <label>Adresse</label>
                <input 
                    type="text" 
                    placeholder="Entrez l'adresse complète" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                />

                <div className="address-details">
                    <div>
                        <label>Pays</label>
                        <input 
                            type="text" 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="address-details">
                    <div>
                        <label>Code Postal</label>
                        <input 
                            type="text" 
                            value={postalCode} 
                            onChange={(e) => setPostalCode(e.target.value)} 
                        />
                    </div>
                </div>

                <button type="submit" className="submit-button">Payer</button>
            </form>
        </div>
    );
}

export default PaymentPage;
