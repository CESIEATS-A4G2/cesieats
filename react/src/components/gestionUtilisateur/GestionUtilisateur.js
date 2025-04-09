import React, { useState } from 'react';
import "./GestionUtilisateur.css";
import api from "../../api";  
const GestionUtilisateur = ({ name,role,user, onSuspend, onDelete,avatar,key }) => {
  const [modalType, setModalType] = useState(null); // "suspendre" ou "supprimer"
  const [showModal, setShowModal] = useState(false);
  const [suspensionDays, setSuspensionDays] = useState(7); // Valeur par défaut


  const handleDelete = async () => {
    try {
      console.log("User ", user.account_id);
      await api.deleteUser(user.account_id);
      alert("L'utilisateur a été supprimé !");
    } 

       catch (error2) {
        const errorMessage = error2.response?.data?.message || "Une erreur est survenue lors de la requête.";
        const errorDetails = error2.response?.data?.error?.message || "Pas de détails supplémentaires.";
        alert(`Erreur : ${errorMessage}\nDétails : ${errorDetails}`);
      }
    }

  const handleConfirm = () => {
    if (modalType === "supprimer") {
      handleDelete(user.id);
      window.location.reload();
    } else if (modalType === "suspendre") {
      onSuspend(user.id, suspensionDays);
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="utilisateur-row">
        <div className="utilisateur-info">
          <img src={avatar} alt="avatar" className="utilisateur-avatar" />
          <div className="utilisateur-details">
            <div className="utilisateur-username">
              {name} | {user.role} 
            </div>
          </div>
        </div>
        <div className="utilisateur-actions">
          <button
            onClick={() => { setModalType("suspendre"); setShowModal(true); }}
            className="utilisateur-button suspendre"
          >
            Suspendre
          </button>
          <button
            onClick={() => { setModalType("supprimer"); setShowModal(true); }}
            className="utilisateur-button supprimer"
          >
            Supprimer son compte
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>
              {modalType === "supprimer" ? (
                <>Êtes-vous sûr de vouloir supprimer le compte de <strong>{user.username}</strong> ?</>
              ) : (
                <>
                  Êtes-vous sûr de vouloir suspendre le compte de <strong>{user.username}</strong> pendant{" "}
                  <input
                    type="number"
                    min="1"
                    value={suspensionDays}
                    onChange={(e) => setSuspensionDays(e.target.value)}
                    style={{ width: "50px", margin: "0 5px" }}
                  /> jours ?
                </>
              )}
            </p>
            <div className="modal-actions">
              <button onClick={handleConfirm} className="utilisateur-button suspendre">Confirmer</button>
              <button onClick={() => setShowModal(false)} className="utilisateur-button supprimer">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default GestionUtilisateur;
