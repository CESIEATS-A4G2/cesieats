
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

CREATE TABLE Cart_Items (
    cart_id VARCHAR(12),
    item_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, item_id),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE TABLE Cart_Menu (
    account_id VARCHAR(12),
    menu_id VARCHAR(12),
    quantity INT NOT NULL,
    PRIMARY KEY (account_id, menu_id),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
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