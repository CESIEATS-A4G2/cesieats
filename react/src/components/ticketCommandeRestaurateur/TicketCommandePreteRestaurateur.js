import React from "react";
import "./TicketCommandeRestaurateur.css";

function TicketCommandePreteRestaurateur() {
    return (
        <div className="command-restaurateur">
            <div className="order-card">
                <div className="order-info">
                    <span className="order-name">Emilie N</span>
                </div>
                <div className="order-time-label">Prête depuis</div>
                <div className="order-time">10 min</div>
            </div>
        </div>
    );
}

export default TicketCommandePreteRestaurateur;