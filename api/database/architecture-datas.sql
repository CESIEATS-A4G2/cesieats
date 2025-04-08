CREATE TABLE Accounts (
    account_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    role ENUM('User', 'Delivery Man', 'Restaurateur') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
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
    account_id VARCHAR(12),
    restaurant_id VARCHAR(12),
    PRIMARY KEY (account_id, restaurant_id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Menus (
    menu_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12),
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Items (
    item_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12),
    options_label VARCHAR(255),
    options JSON,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Menu_Item (
    menu_id VARCHAR(12),
    item_id VARCHAR(12),
    PRIMARY KEY (menu_id, item_id),
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE TABLE Carts (
    account_id VARCHAR(12) PRIMARY KEY,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE Cart_Item (
    account_id VARCHAR(12),
    item_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (account_id, item_id),
    FOREIGN KEY (account_id) REFERENCES Carts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE TABLE Cart_Menu (
    account_id VARCHAR(12),
    menu_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (account_id, menu_id),
    FOREIGN KEY (account_id) REFERENCES Carts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id) ON DELETE CASCADE
);

CREATE TABLE Reviews (
    account_id VARCHAR(12),
    restaurant_id VARCHAR(12),
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

-- Auto-generate formatted IDs
CREATE TRIGGER before_insert_account
BEFORE INSERT ON Accounts
FOR EACH ROW
BEGIN
    SET NEW.account_id = CONCAT('ACC', LPAD((SELECT COALESCE(MAX(SUBSTRING(account_id, 4)), 0) + 1 FROM Accounts), 6, '0'));
END$$

CREATE TRIGGER before_insert_restaurant
BEFORE INSERT ON Restaurants
FOR EACH ROW
BEGIN
    SET NEW.restaurant_id = CONCAT('RES', LPAD((SELECT COALESCE(MAX(SUBSTRING(restaurant_id, 4)), 0) + 1 FROM Restaurants), 6, '0'));
END$$

CREATE TRIGGER before_insert_menu
BEFORE INSERT ON Menus
FOR EACH ROW
BEGIN
    SET NEW.menu_id = CONCAT('MEN', LPAD((SELECT COALESCE(MAX(SUBSTRING(menu_id, 4)), 0) + 1 FROM Menus), 6, '0'));
END$$

CREATE TRIGGER before_insert_items
BEFORE INSERT ON Items
FOR EACH ROW
BEGIN
    SET NEW.item_id = CONCAT('ITM', LPAD((SELECT COALESCE(MAX(SUBSTRING(item_id, 4)), 0) + 1 FROM Items), 6, '0'));
END$$

CREATE TRIGGER before_insert_logs
BEFORE INSERT ON Logs
FOR EACH ROW
BEGIN
    SET NEW.log_id = CONCAT('REV', LPAD((SELECT COALESCE(MAX(SUBSTRING(log_id, 4)), 0) + 1 FROM Logs), 6, '0'));
END$$

DELIMITER $$

-- Insertion des comptes
INSERT INTO Accounts (name, email, password, phone, address, role) VALUES
('John Doe', 'john.doe@example.com', 'hashedpassword1', '1234567890', '123 Main St', 'User'),
('Jane Smith', 'jane.smith@example.com', 'hashedpassword2', '0987654321', '456 Oak St', 'User'),
('Mike Johnson', 'mike.johnson@example.com', 'hashedpassword3', '1122334455', '789 Pine St', 'Delivery Man'),
('Restaurant Owner', 'owner@example.com', 'hashedpassword4', '2233445566', '321 Birch St', 'Restaurateur');

-- Insertion des restaurants
INSERT INTO Restaurants (name, description, address,fees,prep_time,image, open_hour) VALUES
('Pizza Palace', 'Best pizza in town', '100 Pizza Street',1.99,15,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744045996/30be7d11a3ed6f6183354d1933fbb6c7_ovqign.jpg', '10:00-22:00'),
('Burger Heaven', 'Juicy burgers every day', '200 Burger Avenue',0.99,25,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046073/unnamed_plknyk.png', '11:00-23:00'),
('Sushi World', 'Fresh sushi made daily', '300 Sushi Lane',2.59,30,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744103757/images_1_qlqgih.jpg', '12:00-21:00');

-- Lier les propriétaires de restaurants
INSERT INTO Account_Restaurant (account_id, restaurant_id) VALUES
('ACC000001', 'RES000001'),
('ACC000001', 'RES000002');

-- Insertion des menus
INSERT INTO Menus (restaurant_id, name, description, price,image) VALUES
('RES000001', 'Pizza Menu', 'A selection of our best pizzas', 15.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744103991/16bb0a3ab8ea98cfe8906135767f7bf4_k6mck8.jpg'),
('RES000002', 'Burger Menu', 'Our best burgers in a combo', 12.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744104070/Menu-Burger-Californian_ocvpli.png'),
('RES000003', 'Sushi Set', 'Fresh sushi assortment', 20.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744104115/1000_F_82346311_Ei9MME34m3GPY1VnHgbcK5Vp5YT4hxKl_m4i7vc.jpg');

-- Insertion des items
INSERT INTO Items (restaurant_id, name, description, price,image) VALUES
('RES000001', 'Pepperoni Pizza', 'Classic pepperoni pizza', 9.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046227/pizza_pepperoni_vjjkp9.jpg'),
('RES000001', 'Margherita Pizza', 'Tomato, mozzarella, basil', 8.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046283/143791_w1024h1024c1cx960cy540cxt0cyt0cxb1920cyb1080_lhi4cb.jpg'),
('RES000002', 'Cheeseburger', 'Juicy beef patty with cheese', 5.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046343/Cheeseburger_GLOBAL_400x400px_72DPI_V2_ejky7n.png'),
('RES000002', 'Chicken Burger', 'Grilled chicken with lettuce', 6.49,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046526/chicken-burger-bistrot_klqikc.jpg'),
('RES000003', 'Salmon Sushi', 'Fresh salmon sushi', 4.99,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046577/MOMA-SUSHI-SAUMON-CHEESE-NOV24-PDANIEL-045-scaled_smtfoa.jpg'),
('RES000003', 'Tuna Sushi', 'Premium tuna sushi', 5.49,'https://res.cloudinary.com/dzsnjlgc5/image/upload/v1744046638/tuna-sushi-roll-14-500x500_cbksbq.jpg');

-- Associer les items aux menus
INSERT INTO Menu_Item (menu_id, item_id) VALUES
('MEN000001', 'ITM000001'),
('MEN000001', 'ITM000002'),
('MEN000002', 'ITM000003'),
('MEN000002', 'ITM000004'),
('MEN000003', 'ITM000005'),
('MEN000003', 'ITM000006');

-- Création de paniers
INSERT INTO Carts (account_id) VALUES
('ACC000001'),
('ACC000002');

-- Ajouter des items aux paniers
INSERT INTO Cart_Item (account_id, item_id, quantity) VALUES
('ACC000001', 'ITM000001', 2),
('ACC000001', 'ITM000003', 1),
('ACC000002', 'ITM000005', 3);

-- Ajouter des avis
INSERT INTO Reviews (account_id, restaurant_id, rating) VALUES
('ACC000001', 'RES000001', 5),
('ACC000002', 'RES000003', 4);
