import React from 'react';
import "./GestionUtilisateur.css"

const GestionUtilisateur = ({ user, onSuspend, onDelete }) => {
  return (
    <div className="utilisateur-row">
      <div className="utilisateur-info">
        <img
          src={user.avatar}
          alt="avatar"
          className="utilisateur-avatar"
        />
        <div className="utilisateur-details">
          <div className="utilisateur-username">{user.username} | {user.role}</div>
        </div>
      </div>
      <div className="utilisateur-actions">
        <button
          onClick={() => onSuspend(user.id)}
          className="utilisateur-button suspendre"
        >
          Suspendre
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="utilisateur-button supprimer"
        >
          Supprimer son compte
        </button>
      </div>
    </div>
  );
};

export default GestionUtilisateur;
