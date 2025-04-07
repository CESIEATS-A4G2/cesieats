import React from "react";
import "./TicketCommandeAdmin.css";

function TicketCommandeAdmin() {
    return (
        <div className="command-admin">
            <div className="order-card">
                <div className="order-info">
                    <span className="order-name">Lucas G</span>
                </div>
                <div className="order-time-label">Prête en </div>
                <div className="order-time">23 min</div>
            </div>
        </div>
    );
}

export default TicketCommandeAdmin;