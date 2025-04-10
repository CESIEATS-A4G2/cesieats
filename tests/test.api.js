const axios = require("axios").default;

/* Scénario : 
  -1 : création d'un restaurant
  -2 : création d'un item
  -3 : création d'un menu
  -4 : ajout d'un item au menu
  -4 : création d'un utilisateur test
  -4 : création d'un panier
  -4 : création d'un menu au panier
  -4 : création d'une commande
  -5 : suppression de la commande, du menu, de l'item et du restaurant, du panier, de l'utilisateur
*/

const testAPI = async () => {
    const APIRoute = "http://localhost:3000/api";
    const rand = Math.floor(Math.random() * 100000);
  
    try {
      console.log(" - [1] Création restaurant...");
      const resto = await axios.post(`${APIRoute}/restaurants`, {
        name: `TestResto${rand}`,
        description: "Un restaurant de test",
        fees: "2.2",
        prep_time: "11",
        address: "123 rue de test",
        open_hour: "08:00 - 22:00",
      });
      console.log("✅ OK : ", resto.data);
      const restaurant_id = resto.data.restaurant_id;
      console.log(restaurant_id)
  
      console.log(" - [2] Création item...");
      const item = await axios.post(`${APIRoute}/restaurants/${restaurant_id}/items`, {
        name: `Item${rand}`,
        description: "Item de test",
        price: 9.99,
        image: "test.png"
      });
      console.log("✅ OK : ", item.data);
      const item_id = item.data.item_id;
  
      console.log(" - [3] Création menu...");
      const menu = await axios.post(`${APIRoute}/restaurants/${restaurant_id}/menus`, {
        name: `Menu-${rand}`,
        description: "Menu test",
        price: 14.99,
        image: "menu.png"
      });
      console.log("✅ OK : ", menu.data);
      const menu_id = menu.data.menu_id;

      console.log(" - [4] Ajout item au menu...");
      const link = await axios.post(`${APIRoute}/restaurants/${restaurant_id}/menus/${menu_id}`, {
        item_id: item_id,
      });
      console.log("✅ OK : ", link.data);

      console.log(" - [5] Création utilisateur test...");
      const user = await axios.post(`${APIRoute}/accounts`, {
        name: `User${rand}`,
        email: `user${rand}@test.com`,
        password: "123456",
        phone: "0000000000",
        address: "1 rue de test",
        role: "User",
      });
      const account_id = user.data.account_id;
      console.log("✅ OK : ", user.data);

      console.log(" - [6] Création panier...");
      await axios.post(`${APIRoute}/accounts/${account_id}/cart`);
      console.log("✅ OK : Panier créé");

      console.log(" - [7] Ajout item au panier...");
      await axios.post(`${APIRoute}/accounts/${account_id}/cart/items`, {
        item_id: item_id,
        quantity: 4,
      });
      console.log("✅ OK : item ajouté au panier");

      console.log(" - [8] Mise a jour quantité de l'item du panier...");
      await axios.put(`${APIRoute}/accounts/${account_id}/cart/items/${item_id}/2`);
      console.log("✅ OK : quantité item mis a jour dans le panier");

      console.log(" - [9] Ajout menu au panier...");
      await axios.post(`${APIRoute}/accounts/${account_id}/cart/menus`, {
        menu_id: menu_id,
        quantity: 2,
      });
      console.log("✅ OK : menu ajouté au panier");

      console.log(" - [10] Mise a jour quantité du menu du panier...");
      await axios.put(`${APIRoute}/accounts/${account_id}/cart/menus/${menu_id}/4`);
      console.log("✅ OK : quantité menu mis a jour dans le panier");
      
      console.log(" - [11] Création commande...");
      const order = await axios.post(`${APIRoute}/accounts/${account_id}/orders`);
      console.log("✅ OK :", order.data);
  
    // Cleanup (non bloquant, juste pour test local)
    console.log(" - [12] Nettoyage...");
    await axios.delete(`${APIRoute}/restaurants/${restaurant_id}/menus/${menu_id}/items/${item_id}`);
    await axios.delete(`${APIRoute}/restaurants/${restaurant_id}/menus/${menu_id}`);
    await axios.delete(`${APIRoute}/restaurants/${restaurant_id}/items/${item_id}`);
    await axios.delete(`${APIRoute}/restaurants/${restaurant_id}`);
    await axios.delete(`${APIRoute}/accounts/${account_id}`);
    console.log("✅ OK : Cleanup terminé");
  
    } catch (err) {
      console.error("❌ KO :", err.response?.data || err.message);
      process.exit(1);
    }
  };
  
  console.log("✅ Test API lancé...");
  testAPI();
  