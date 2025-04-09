import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CreationArticle.css";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";
import api from "../../api"; // Assure-toi que c'est bien importé

function CreationArticle() {
    const location = useLocation();
    const articleData = location.state || {};
    const [description, setDescription] = useState(false);
    const [price, setPrice] = useState(false);
    const [image, setImage] = useState(false);
    const navigate = useNavigate();
    const isNew = articleData.name === "new";

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [articleName, setArticleName] = useState(articleData.name || "");
    const [articleId, setArticleId] = useState(articleData.id || "");

    useEffect(() => {
        if (!isNew) {
            setArticleId(articleData.id || "");
            setArticleName(articleData.name || "");
            setDescription(articleData.description || "");
            setPrice(articleData.price || "");
            setImage(articleData.image || null);
        }
    }, []);
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const dataUpdate = {
            item_id: articleId, 
            name: articleName,
            description,
            price,
            image,
          };          
        
          const dataCreate = {
            name: articleName,
            description,
            price,
            image,
          };      

        navigate("/gestionarticle-restaurateur");
        try {
            if (isNew) {
                await api.createItem("RES000001", dataCreate);
                alert("✅ Article créé avec succès !");
            } else {
                await api.updateitemMajUser("RES000001", dataUpdate);
                alert("✅ Article modifié avec succès !");
            }
            
          setIsMenuOpen(false)        
        } catch (error) {
          console.error("Erreur lors de la création de l'article :", error);
          alert("❌ Une erreur est survenue lors de l'ajout de l'article.");
        }
      };

    return (
        <div className="command-restaurateur-page">
            <div className="header">
                <FiAlignJustify className="menu-icon" onClick={toggleMenu} />
                <h1 className="title">Création d'article</h1>
            </div>

            <form className="creation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="articleName">Nom de l'article</label>
                    <input
                        type="text"
                        id="articleName"
                        value={articleName}
                        onChange={(e) => setArticleName(e.target.value)}
                        placeholder="Entrez le nom de l'article"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Entrez une description"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Prix</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Entrez le prix"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Choisir une image</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={image} alt="Preview" className="image-preview" />}
                </div>

                <button type="submit" className="submit-btn">
                {isNew ? "Ajouter l'article" : "Modifier l'article"}
                </button>
            </form>

            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}

export default CreationArticle;
