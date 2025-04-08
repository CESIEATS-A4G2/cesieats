import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = {

    // Restaurants
    getAllRestaurants: () => axios.get(`${API_URL}/restaurants`),
    getRestaurant: (restaurantId) => axios.get(`${API_URL}/restaurants/${restaurantId}`),
    createRestaurant: (data) => axios.post(`${API_URL}/restaurants`, data),
    deleteRestaurant: (restaurantId) => axios.delete(`${API_URL}/restaurants/${restaurantId}`),

    // Menus
    createMenu: (restaurantId, data) => axios.post(`${API_URL}/restaurants/${restaurantId}/menus`, data),
    getAllMenus: (restaurantId) => axios.get(`${API_URL}/restaurants/${restaurantId}/menus`),
    getMenu: (restaurantId, menuId) => axios.get(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}`),
    deleteMenu: (restaurantId, menuId) => axios.delete(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}`),

    // Items
    createItem: (restaurantId, data) => axios.post(`${API_URL}/restaurants/${restaurantId}/items`, data),
    getAllItemsByRestaurant: (restaurantId) => axios.get(`${API_URL}/restaurants/${restaurantId}/items`),
    getAllItemsByMenu: (restaurantId, menuId) => axios.get(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}/items`),
    getItem: (restaurantId, itemId) => axios.get(`${API_URL}/restaurants/${restaurantId}/items/${itemId}`),
    deleteItemFromRestaurant: (restaurantId, itemId) => axios.delete(`${API_URL}/restaurants/${restaurantId}/items/${itemId}`),
    deleteItemFromMenu: (restaurantId, menuId, itemId) => axios.delete(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}/items/${itemId}`),

    // Ajouter un item à un menu
    addItemToMenu: (restaurantId, menuId, data) => axios.post(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}`, data),

    // Gestion du compte
    getUser: (userId) => axios.get(`${API_URL}/users/${userId}`),
    updateUser: (userId, data) => axios.put(`${API_URL}/users/${userId}`, data),
    deleteUser: (userId) => axios.delete(`${API_URL}/users/${userId}`),
    
    // Carts
    createCart: (account_id, data) => axios.post(`${API_URL}/accounts/${account_id}/cart`, data),
    getCart: (account_id) => axios.get(`${API_URL}/accounts/${account_id}/cart`),
    deleteCart: (account_id) => axios.delete(`${API_URL}/accounts/${account_id}/cart`), 
    deleteItemToCart: (account_id, item_id) => axios.delete(`${API_URL}/accounts/${account_id}/cart/items`, {
        data : {item_id: item_id}
    }),    
    deleteMenuToCart: (account_id, menu_id) => axios.delete(`${API_URL}/accounts/${account_id}/cart/menus`, {
         data : {menu_id: menu_id}
    }),    
    addItemToCart: (account_id, item_id, quantity) => axios.post(`${API_URL}/accounts/${account_id}/cart/items`, {
        item_id: item_id,
        quantity: quantity
    }),
    addMenuToCart: (account_id, item_id, quantity) => axios.post(`${API_URL}/accounts/${account_id}/cart/menus`, {
        menu_id: item_id,
        quantity: quantity
    })

};

export default api;