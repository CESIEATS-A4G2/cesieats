
CREATE TABLE Accounts (
    account_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    role ENUM('User', 'Livreur', 'Restaurateur') NOT NULL,
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
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Menus (
    menu_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12),
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image LONGBLOB,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Items (
    item_id VARCHAR(12) PRIMARY KEY,
    restaurant_id VARCHAR(12),
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    image LONGBLOB,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Menu_Item (
    menu_id VARCHAR(12),
    item_id VARCHAR(12),
    PRIMARY KEY (menu_id, item_id),
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

CREATE TABLE Orders (
    order_id VARCHAR(12) PRIMARY KEY,
    cart_id VARCHAR(12),
    account_id VARCHAR(12),
    restaurant_id VARCHAR(12),
    address VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Pending',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Carts (
    cart_id VARCHAR(12) PRIMARY KEY,
    account_id VARCHAR(12),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
);

CREATE TABLE Cart_Items (
    cart_id VARCHAR(12),
    item_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, item_id),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

CREATE TABLE Cart_Menu (
    account_id VARCHAR(12),
    menu_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (account_id, menu_id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id)
);

CREATE TABLE Reviews (
    account_id VARCHAR(12),
    restaurant_id VARCHAR(12),
    rating INT CHECK (rating BETWEEN 1 AND 5), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id),
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

CREATE TRIGGER before_insert_reviews
BEFORE INSERT ON Reviews
FOR EACH ROW
BEGIN
    SET NEW.review_id = CONCAT('REV', LPAD((SELECT COALESCE(MAX(SUBSTRING(review_id, 4)), 0) + 1 FROM Reviews), 6, '0'));
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
CREATE TRIGGER after_order_insert
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO Logs (event_description)
    VALUES (CONCAT('Orders ', NEW.order_id, ' placed by account ', NEW.account_id));
END$$

DELIMITER ;

-- CREATE ACCOUNTS
INSERT INTO Accounts (account_id, name, email, phone, password, address, role) VALUES
('ACC000001', 'Alice Dupont', 'alice.dupont@email.com', '0601020304', 'hashed_password_1', '10 rue de Paris, 75001 Paris', 'User'),
('ACC000002', 'Bob Martin', 'bob.martin@email.com', '0611121314', 'hashed_password_2', '20 avenue de Lyon, 69001 Lyon', 'Livreur'),
('ACC000003', 'Charlie Durand', 'charlie.durand@email.com', '0622232425', 'hashed_password_3', '30 boulevard de Lille, 59800 Lille', 'Restaurateur');

-- INSERT RESTAURANTS
INSERT INTO Restaurants (restaurant_id, name, description, address, open_hour) VALUES
('RES000001', 'Le Bon Goût', 'Un restaurant gastronomique français.', '15 rue des Saveurs, 75002 Paris', '12:00 - 23:00'),
('RES000002', 'Pizza Express', 'Pizzas fraîches et délicieuses.', '25 avenue Napoléon, 69002 Lyon', '11:00 - 22:30');

-- INSERT ACCOUNT_RESTAURANT
INSERT INTO Account_Restaurant (account_id, restaurant_id) VALUES
('ACC000003', 'RES000001');

-- INSERT MENUS
INSERT INTO Menus (menu_id, restaurant_id, name, description, price) VALUES
('MEN000001', 'RES000001', 'Menu Gourmet', 'Entrée, plat et dessert.', 29.99),
('MEN000002', 'RES000002', 'Menu Pizza', 'Pizza + boisson.', 15.99);

-- INSERT ITEMS
INSERT INTO Items (item_id, restaurant_id, name, description, price) VALUES
('ITM000001', 'RES000001', 'Steak Frites', 'Steak grillé avec frites maison.', 18.50),
('ITM000002', 'RES000002', 'Pizza Margherita', 'Tomate, mozzarella, basilic.', 12.00);

-- INSERT MENU_ITEM
INSERT INTO Menu_Item (menu_id, item_id) VALUES
('MEN000001', 'ITM000001'),
('MEN000002', 'ITM000002');

-- INSERT CARTS
INSERT INTO Carts (cart_id, account_id) VALUES
('CRT000001', 'ACC000001');

-- INSERT CART_ITEMS
INSERT INTO Cart_Items (cart_id, item_id, quantity) VALUES
('CRT000001', 'ITM000002', 2);

-- INSERT CART_MENU
INSERT INTO Cart_Menu (account_id, menu_id, quantity) VALUES
('ACC000001', 'MEN000002', 1);

-- INSERT ORDERS
INSERT INTO Orders (order_id, cart_id, account_id, restaurant_id, address, status) VALUES
('ORD000001', 'CRT000001', 'ACC000001', 'RES000002', '10 rue de Paris, 75001 Paris', 'Pending');

-- INSERT REVIEWS
INSERT INTO Reviews (account_id, restaurant_id, rating) VALUES
('ACC000001', 'RES000001', 5);