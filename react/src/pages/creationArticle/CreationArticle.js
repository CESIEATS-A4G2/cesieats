import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CreationArticle.css";
import BurgerMenuRestaurateur from "../../components/burgerMenuRestaurateur/BurgerMenuRestaurateur";
import { FiAlignJustify } from "react-icons/fi";

function CreationArticle() {
    const location = useLocation();
    const articleData = location.state || {};

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [articleName, setArticleName] = useState(articleData.name || "");
    const [description, setDescription] = useState(articleData.description || "");
    const [price, setPrice] = useState(articleData.price || "");
    const [image, setImage] = useState(articleData.image || null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleImageChange = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ articleName, description, price, image });
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
                    Ajouter l'article
                </button>
            </form>

            <BurgerMenuRestaurateur isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}

export default CreationArticle;
