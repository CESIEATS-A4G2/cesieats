import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = {

    // Restaurants
    getAllRestaurants: () => axios.get(`${API_URL}/restaurants`),
    getRestaurantByAccountId: (accountId) => axios.get(`${API_URL}/accounts/${accountId}/restaurants/`),
    getRestaurant: (restaurantId) => axios.get(`${API_URL}/restaurants/${restaurantId}`),
    createRestaurant: (data) => axios.post(`${API_URL}/restaurants`, data),
    deleteRestaurant: (restaurantId) => axios.delete(`${API_URL}/restaurants/${restaurantId}`),
    modifyOwnerRestaurant: (restaurantId, data) => axios.post(`${API_URL}/restaurants/${restaurantId}/users`, data),
    UpdateRestorant: (restaurantId, data) => axios.put(`${API_URL}/restaurants/${restaurantId}`, data),

    // Commande
    getOrderByStatus: (status) => axios.get(`${API_URL}/orders/status/${status}`),

    // Menus
    createMenu: (restaurantId, data) => axios.post(`${API_URL}/restaurants/${restaurantId}/menus`, data),
    getAllMenus: (restaurantId) => axios.get(`${API_URL}/restaurants/${restaurantId}/menus`),
    getMenu: (restaurantId, menuId) => axios.get(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}`),
    deleteMenu: (restaurantId, menuId) => axios.delete(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}`),
    updateMenuMajUser: (restoId, data) => axios.put(`${API_URL}/restaurants/${restoId}/menus/${data.menu_id}`, {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
    }),

    // Items
    createItem: (restaurantId, data) => axios.post(`${API_URL}/restaurants/${restaurantId}/items`, data),
    getAllItemsByRestaurant: (restaurantId) => axios.get(`${API_URL}/restaurants/${restaurantId}/items`),
    getAllItemsByMenu: (restaurantId, menuId) => axios.get(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}/items`),
    getItem: (restaurantId, itemId) => axios.get(`${API_URL}/restaurants/${restaurantId}/items/${itemId}`),
    deleteItemFromRestaurant: (restaurantId, itemId) => axios.delete(`${API_URL}/restaurants/${restaurantId}/items/${itemId}`),
    deleteItemFromMenu: (restaurantId, menuId, itemId) => axios.delete(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}/items/${itemId}`),
    updateitemMajUser: (restoId, data) => axios.put(`${API_URL}/restaurants/${restoId}/items/${data.item_id}`, {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
    }),

    // Ajouter un item à un menu
    addItemToMenu: (restaurantId, menuId, itemId) => axios.post(`${API_URL}/restaurants/${restaurantId}/menus/${menuId}`, {
        item_id: itemId 
    }),

    // Gestion du compte
    getUser: (userId) => axios.get(`${API_URL}/accounts/${userId}`),
    updateUser: (userId, data) => axios.put(`${API_URL}/accounts/${userId}`, data),
    deleteUser: (userId) => axios.delete(`${API_URL}/accounts/${userId}`),
    getAllUsers: () => axios.get(`${API_URL}/accounts`),
    suspendUser: (userId,suspend) => axios.put(`${API_URL}/accounts/${userId}/actions/suspend`,{
        suspend_time:suspend,
    }),
    
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
    }),
    changeQuantityToCart: (account_id, item_id, quantity) => axios.put(`${API_URL}/accounts/${account_id}/cart/items/${item_id}/${quantity}`), 

    // Order
    getOrderById:(order_id) => axios.get(`${API_URL}/orders/${order_id}`),
    deleteOrderById:(order_id) => axios.delete(`${API_URL}/orders/${order_id}`),
    createOrder: (account_id) => axios.post(`${API_URL}/accounts/${account_id}/orders`),
    getOrderByStatus: (status) => axios.get(`${API_URL}/orders/status/${status}`),
    getOrderByAccountAndStatus:(account_id, status) => axios.get(`${API_URL}/accounts/${account_id}/orders/status/${status}`),
    changeStatusByOrder: (order_id, status) => axios.put(`${API_URL}/orders/${order_id}/${status}`),


};

export default api;