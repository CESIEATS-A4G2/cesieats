
CREATE TABLE Accounts (
    account_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    role ENUM('User', 'Delivery Man', 'Restaurateur ') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Restaurants (
    restaurant_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    address VARCHAR(255) NOT NULL,
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
    image LONGBLOB,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Items (
    item_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12),
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image LONGBLOB,
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
    cart_id VARCHAR(12) PRIMARY KEY,
    account_id VARCHAR(12),
    status ENUM('IN PROGRESS', 'DONE') DEFAULT 'IN PROGRESS',
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE Orders (
    order_id VARCHAR(12) PRIMARY KEY,
    cart_id VARCHAR(12),
    account_id VARCHAR(12),
    restaurant_id VARCHAR(12),
    address VARCHAR(255),
    status VARCHAR(50) DEFAULT 'PENDING',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE Cart_Item (
    cart_id VARCHAR(12),
    item_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, item_id),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE TABLE Cart_Menu (
    cart_id VARCHAR(12),
    menu_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, menu_id),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id) ON DELETE CASCADE,
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

CREATE TRIGGER before_insert_orders
BEFORE INSERT ON Orders
FOR EACH ROW
BEGIN
    SET NEW.order_id = CONCAT('ORD', LPAD((SELECT COALESCE(MAX(SUBSTRING(order_id, 4)), 0) + 1 FROM Orders), 6, '0'));
END$$

CREATE TRIGGER before_insert_logs
BEFORE INSERT ON Logs
FOR EACH ROW
BEGIN
    SET NEW.log_id = CONCAT('REV', LPAD((SELECT COALESCE(MAX(SUBSTRING(log_id, 4)), 0) + 1 FROM Logs), 6, '0'));
END$$

CREATE TRIGGER before_insert_carts
BEFORE INSERT ON Carts
FOR EACH ROW
BEGIN
    SET NEW.cart_id = CONCAT('CRT', LPAD((SELECT COALESCE(MAX(SUBSTRING(cart_id, 4)), 0) + 1 FROM Carts), 6, '0'));
END$$

-- Log Orders
CREATE TRIGGER after_order_insert_log
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO Logs (event_description)
    VALUES (CONCAT('Orders ', NEW.order_id, ' placed by account ', NEW.account_id));
END$$

-- Passe une commande à DONE quand quand elle est insert dans un order
CREATE TRIGGER after_order_insert
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    UPDATE Carts
    SET status = 'DONE'
    WHERE cart_id = NEW.cart_id;
END$$
DELIMITER ;

-- Insertion des comptes
INSERT INTO Accounts (name, email, password, phone, address, role) VALUES
('John Doe', 'john.doe@example.com', 'hashedpassword1', '1234567890', '123 Main St', 'User'),
('Jane Smith', 'jane.smith@example.com', 'hashedpassword2', '0987654321', '456 Oak St', 'User'),
('Mike Johnson', 'mike.johnson@example.com', 'hashedpassword3', '1122334455', '789 Pine St', 'Delivery Man'),
('Restaurant Owner', 'owner@example.com', 'hashedpassword4', '2233445566', '321 Birch St', 'Restaurateur');

-- Insertion des restaurants
INSERT INTO Restaurants (name, description, address, open_hour) VALUES
('Pizza Palace', 'Best pizza in town', '100 Pizza Street', '10:00-22:00'),
('Burger Heaven', 'Juicy burgers every day', '200 Burger Avenue', '11:00-23:00'),
('Sushi World', 'Fresh sushi made daily', '300 Sushi Lane', '12:00-21:00');

-- Lier les propriétaires de restaurants
INSERT INTO Account_Restaurant (account_id, restaurant_id) VALUES
('ACC000001', 'RES000001'),
('ACC000001', 'RES000002');

-- Insertion des menus
INSERT INTO Menus (restaurant_id, name, description, price) VALUES
('RES000001', 'Pizza Menu', 'A selection of our best pizzas', 15.99),
('RES000002', 'Burger Menu', 'Our best burgers in a combo', 12.99),
('RES000003', 'Sushi Set', 'Fresh sushi assortment', 20.99);

-- Insertion des items
INSERT INTO Items (restaurant_id, name, description, price) VALUES
('RES000001', 'Pepperoni Pizza', 'Classic pepperoni pizza', 9.99),
('RES000001', 'Margherita Pizza', 'Tomato, mozzarella, basil', 8.99),
('RES000002', 'Cheeseburger', 'Juicy beef patty with cheese', 5.99),
('RES000002', 'Chicken Burger', 'Grilled chicken with lettuce', 6.49),
('RES000003', 'Salmon Sushi', 'Fresh salmon sushi', 4.99),
('RES000003', 'Tuna Sushi', 'Premium tuna sushi', 5.49);

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
INSERT INTO Cart_Item (cart_id, item_id, quantity) VALUES
('CRT000001', 'ITM000001', 2),
('CRT000001', 'ITM000003', 1),
('CRT000002', 'ITM000005', 3);

-- Passer des commandes
INSERT INTO Orders (cart_id, account_id, restaurant_id, address, status) VALUES
('CRT000001', 'ACC000001', 'RES000001', '123 Main St', 'PENDING'),
('CRT000002', 'ACC000002', 'RES000003', '456 Oak St', 'PENDING');

-- Ajouter des avis
INSERT INTO Reviews (account_id, restaurant_id, rating) VALUES
('ACC000001', 'RES000001', 5),
('ACC000002', 'RES000003', 4);
