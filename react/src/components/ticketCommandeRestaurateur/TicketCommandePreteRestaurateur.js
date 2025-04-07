import React from "react";
import { useNavigate } from "react-router-dom";
import "./TicketCommandeRestaurateur.css";

function TicketCommandePreteRestaurateur({ nom, temps, type = "prete" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/gestioncommande-restaurateur", {
            state: {
                nomClient: nom,
                duree: temps,
                type: type
            }
        });
    };

    return (
        <div className="command-restaurateur" onClick={handleClick}>
            <div className="order-card">
                <div className="order-info">
                    <span className="order-name">{nom}</span>
                </div>
                <div className="order-time-label">
                    {type === "prete" ? "Prête depuis" : "Temps de préparation :"}
                </div>
                <div className="order-time">{temps}</div>
            </div>
        </div>
    );
}

export default TicketCommandePreteRestaurateur;
