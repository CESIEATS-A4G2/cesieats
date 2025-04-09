import React from "react";
import { useNavigate } from "react-router-dom";
import "./TicketCommandeRestaurateur.css";

function TicketCommandePreteRestaurateur({ order, nom, temps }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/gestioncommande-restaurateur", {
            state: {
                order: order,
                nomClient: nom,
                duree: temps
            }
        });
    };
    console.log("order : ", order)

    return (
        <div className="command-restaurateur" onClick={handleClick}>
            <div className="order-card">
                <div className="order-info">
                    <span className="order-name">{nom}</span>
                </div>
                <div className="order-time-label">
                    {order.status === "prete" ? "Prête depuis" : "Temps de préparation :"}
                </div>
                <div className="order-time">{temps}</div>
            </div>
        </div>
    );
}

export default TicketCommandePreteRestaurateur;
