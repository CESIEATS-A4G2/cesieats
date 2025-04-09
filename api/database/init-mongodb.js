db = db.getSiblingDB("cesieatsdb");

if (db.orders.countDocuments() === 0) {
  db.orders.insertMany([
    {
      "account_id": "ACC000001",
      "restaurant_id": "RES000001",
      "restaurant_address": "Allée du grand Ethan",
      "delivery_address": "Boulevard de CESI",
      "status": "DONE",
      "items": [
        { "name": "Burger", "quantity": 2, "price": 7.5 },
        { "name": "Fries", "quantity": 1, "price": 3.0 }
      ],
      "menus": [
        {
          "name": "Burger Combo",
          "quantity": 1,
          "price": 9.0,
          "items": [
            { "name": "Burger", "price": 7.5 },
            { "name": "Soda", "price": 2.0 }
          ]
        }
      ],
      "totalPrice": 27
    },
    {
      "account_id": "ACC000002",
      "restaurant_id": "RES000002",
      "restaurant_address": "Rue de Ange",
      "delivery_address": "Impasse du Saugrenu",
      "status": "DELIVERY_IN_PROGRESS",
      "items": [
        { "name": "Sushi Roll", "quantity": 3, "price": 5.5 }
      ],
      "menus": [
        {
          "name": "Sushi Menu",
          "quantity": 2,
          "price": 6.7,
          "items": [
            { "name": "Sushi Roll" },
            { "name": "Miso Soup" }
          ]
        }
      ],
      "totalPrice": 29.9
    },
    {
      "account_id": "ACC000001",
      "restaurant_id": "RES000002",
      "restaurant_address": "Montée de la montage",
      "delivery_address": "Rue de la choucroute",
      "status": "IN_PREPARATION",
      "items": [
        { "name": "Tacos", "quantity": 4, "price": 4.0 }
      ],
      "menus": [],
      "totalPrice": 16.0
    },
    {
      "account_id": "ACC000002",
      "restaurant_id": "RES000001",
      "status": "PENDING_CONFIRMATION",
      "items": [],
      "menus": [
        {
          "name": "Pasta Menu",
          "quantity": 2,
          "price": 8,
          "items": [
            { "name": "Spaghetti" },
            { "name": "Garlic Bread" }
          ]
        }
      ],
      "totalPrice": 16.0
    },
    {
      "account_id": "ACC000001",
      "restaurant_id": "RES000002",
      "restaurant_address": "Avenue du malvenu",
      "delivery_address": "chez moi svp",
      "status": "DELIVERY_IN_PROGRESS",
      "items": [
        { "name": "Chicken Wings", "quantity": 6, "price": 1.2 }
      ],
      "menus": [
        {
          "name": "Wing Combo",
          "quantity": 1,
          "price": 8.6,
          "items": [
            { "name": "Chicken Wings" },
            { "name": "Coleslaw" }
          ]
        }
      ],
      "totalPrice": 15.8
    },
    {
      "account_id": "ACC000002",
      "restaurant_id": "RES000001",
      "restaurant_address": "Rue des restos vegan",
      "delivery_address": "Rue du gars qui commande une salade et un smoothie",
      "status": "IN_PREPARATION",
      "items": [
        { "name": "Vegan Bowl", "quantity": 1, "price": 9.5 },
        { "name": "Smoothie", "quantity": 1, "price": 4.5 }
      ],
      "menus": [],
      "totalPrice": 14.0
    }
  ]);
}