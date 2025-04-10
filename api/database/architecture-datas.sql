CREATE TABLE Accounts (
    account_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    role ENUM('User', 'DeliveryMan', 'Restaurateur', 'Admin') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    suspended_until DATETIME DEFAULT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Restaurants (
    restaurant_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    fees DECIMAL(10,2) NOT NULL,
    prep_time INT,
    image VARCHAR(255),
    open_hour VARCHAR(50)
);

CREATE TABLE Account_Restaurant (
    account_id VARCHAR(12) NOT NULL,
    restaurant_id VARCHAR(12) NOT NULL,
    PRIMARY KEY (account_id, restaurant_id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Menus (
    menu_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Items (
    item_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12) NOT NULL,
    options_label VARCHAR(255),
    options JSON,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Menu_Item (
    menu_id VARCHAR(12) NOT NULL,
    item_id VARCHAR(12) NOT NULL,
    PRIMARY KEY (menu_id, item_id),
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE TABLE Carts (
    account_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Cart_Item (
    account_id VARCHAR(12) NOT NULL,
    item_id VARCHAR(12) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (account_id, item_id),
    FOREIGN KEY (account_id) REFERENCES Carts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE TABLE Cart_Menu (
    account_id VARCHAR(12) NOT NULL,
    menu_id VARCHAR(12) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (account_id, menu_id),
    FOREIGN KEY (account_id) REFERENCES Carts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id) ON DELETE CASCADE
);

CREATE TABLE Reviews (
    account_id VARCHAR(12) NOT NULL,
    restaurant_id VARCHAR(12) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Logs (
    log_id VARCHAR(12) PRIMARY KEY,
    event_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

-- Insertion des comptes
INSERT INTO Accounts (account_id, name, email, password, phone, address, role) VALUES
('ACC000001', 'John Doe', 'john.doe@example.com', 'hashedpassword1', '1234567890', '123 Main St', 'User'),
('ACC000002', 'Jane Smith', 'jane.smith@example.com', 'hashedpassword2', '0987654321', '456 Oak St', 'User'),
('ACC000003', 'Mike Johnson', 'mike.johnson@example.com', 'hashedpassword3', '1122334455', '789 Pine St', 'DeliveryMan'),
('ACC000004', 'Restaurant Owner', 'owner@example.com', 'hashedpassword4', '2233445566', '321 Birch St', 'Restaurateur'),
('ACC000005', 'Mr Admin', 'admin@example.com', 'admin', '', '', 'Admin');

-- Insertion des restaurants
INSERT INTO Restaurants (restaurant_id, name, description, address,fees,prep_time,image, open_hour) VALUES
('RES000001', 'Pizza Palace', 'Best pizza in town', '100 Pizza Street',1.99,15,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744045996/30be7d11a3ed6f6183354d1933fbb6c7_ovqign.jpg', '10:00-22:00'),
('RES000002', 'Burger Heaven', 'Juicy burgers every day', '200 Burger Avenue',0.99,25,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046073/unnamed_plknyk.png', '11:00-23:00'),
('RES000003', 'Sushi World', 'Fresh sushi made daily', '300 Sushi Lane',2.59,30,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744103757/images_1_qlqgih.jpg', '12:00-21:00');

-- Lier les propriétaires de restaurants
INSERT INTO Account_Restaurant (account_id, restaurant_id) VALUES
('ACC000001', 'RES000001'),
('ACC000001', 'RES000002');

-- Insertion des menus
INSERT INTO Menus (menu_id, restaurant_id, name, description, price,image) VALUES
('MEN000001', 'RES000001', 'Pizza Menu', 'A selection of our best pizzas', 15.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744103991/16bb0a3ab8ea98cfe8906135767f7bf4_k6mck8.jpg'),
('MEN000002', 'RES000002', 'Burger Menu', 'Our best burgers in a combo', 12.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744104070/Menu-Burger-Californian_ocvpli.png'),
('MEN000003', 'RES000003', 'Sushi Set', 'Fresh sushi assortment', 20.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744104115/1000_F_82346311_Ei9MME34m3GPY1VnHgbcK5Vp5YT4hxKl_m4i7vc.jpg');

-- Insertion des items
INSERT INTO Items (item_id, restaurant_id, name, description, price,image) VALUES
('ITM000001', 'RES000001', 'Pepperoni Pizza', 'Classic pepperoni pizza', 9.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046227/pizza_pepperoni_vjjkp9.jpg'),
('ITM000002', 'RES000001', 'Margherita Pizza', 'Tomato, mozzarella, basil', 8.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046283/143791_w1024h1024c1cx960cy540cxt0cyt0cxb1920cyb1080_lhi4cb.jpg'),
('ITM000003', 'RES000002','Cheeseburger', 'Juicy beef patty with cheese', 5.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046343/Cheeseburger_GLOBAL_400x400px_72DPI_V2_ejky7n.png'),
('ITM000004', 'RES000002','Chicken Burger', 'Grilled chicken with lettuce', 6.49,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046526/chicken-burger-bistrot_klqikc.jpg'),
('ITM000005', 'RES000003','Salmon Sushi', 'Fresh salmon sushi', 4.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046577/MOMA-SUSHI-SAUMON-CHEESE-NOV24-PDANIEL-045-scaled_smtfoa.jpg'),
('ITM000006', 'RES000003','Tuna Sushi', 'Premium tuna sushi', 5.49,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046638/tuna-sushi-roll-14-500x500_cbksbq.jpg');

-- Associer les items aux menus
INSERT INTO Menu_Item (menu_id, item_id) VALUES
('MEN000001', 'ITM000001'),
('MEN000001', 'ITM000002'),
('MEN000002', 'ITM000003'),
('MEN000002', 'ITM000004'),
('MEN000003', 'ITM000005'),
('MEN000003', 'ITM000006');

-- Création de paniers
INSERT INTO Carts (account_id, restaurant_id) VALUES
('ACC000001', 'RES000001'),
('ACC000002', 'RES000002');

-- Ajouter des items aux paniers
INSERT INTO Cart_Item (account_id, item_id, quantity) VALUES
('ACC000001', 'ITM000001', 2),
('ACC000001', 'ITM000002', 1),
('ACC000002', 'ITM000005', 3);

-- Ajouter des menus aux paniers
INSERT INTO Cart_Menu (account_id, menu_id, quantity) VALUES
('ACC000001', 'MEN000001', 2);

-- Ajouter des avis
INSERT INTO Reviews (account_id, restaurant_id, rating) VALUES
('ACC000001', 'RES000001', 5),
('ACC000002', 'RES000003', 4);

