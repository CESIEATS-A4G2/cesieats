import React from "react";
import { useNavigate } from "react-router-dom";
import "./TicketCommandeAdmin.css";

function TicketCommandePreteAdmin({id, nom, temps, type = "DONE" }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/commande-admin", {
            state: {
                idCommande: id,
                nomClient: nom,
                duree: temps,
                type: type
            }
        });
    };

    return (
        <div className="command-admin" onClick={handleClick}>
            <div className="order-card">
                <div className="order-info">
                    <span className="order-name">{nom}</span>
                </div>
                <div className="order-time-label">
                    {type === "DONE" ? "Prête depuis" : "Préparation :"}
                </div>
                <div className="order-time">{temps}</div>
            </div>
        </div>
    );
}

export default TicketCommandePreteAdmin;
