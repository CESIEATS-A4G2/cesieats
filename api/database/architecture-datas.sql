
CREATE TABLE Users (
    user_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    prename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Restaurants (
    restaurant_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Menus (
    menu_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    restaurant_id VARCHAR(12),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Items (
    item_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    menu_id VARCHAR(12),
    price DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (menu_id) REFERENCES Menus(menu_id)
);

CREATE TABLE Orders (
    order_id VARCHAR(12) PRIMARY KEY,
    user_id VARCHAR(12),
    restaurant_id VARCHAR(12),
    status ENUM('En attente', 'En cours', 'Livré', 'Annulé') DEFAULT 'En attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Payments (
    payment_id VARCHAR(12) PRIMARY KEY,
    order_id VARCHAR(12),
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('En attente', 'Réussi', 'Echoué') DEFAULT 'En attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Deliveries (
    delivery_id VARCHAR(12) PRIMARY KEY,
    order_id VARCHAR(12),
    delivery_person VARCHAR(255) NOT NULL,
    status ENUM('En cours de livraison', 'Livré', 'Echoué') DEFAULT 'En cours de livraison',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Carts (
    cart_id VARCHAR(12) PRIMARY KEY,
    user_id VARCHAR(12),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Cart_Items (
    cart_id VARCHAR(12),
    item_id VARCHAR(12),
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id, item_id),
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

CREATE TABLE Reviews (
    review_id VARCHAR(12) PRIMARY KEY,
    user_id VARCHAR(12),
    restaurant_id VARCHAR(12),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Notifications (
    notification_id VARCHAR(12) PRIMARY KEY,
    user_id VARCHAR(12),
    message TEXT,
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Logs (
    log_id VARCHAR(12) PRIMARY KEY,
    event_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


DELIMITER $$

-- Auto-generate formatted IDs
CREATE TRIGGER before_insert_users
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    SET NEW.user_id = CONCAT('USR', LPAD((SELECT COALESCE(MAX(SUBSTRING(user_id, 4)), 0) + 1 FROM Users), 6, '0'));
END$$

CREATE TRIGGER before_insert_restaurants
BEFORE INSERT ON Restaurants
FOR EACH ROW
BEGIN
    SET NEW.restaurant_id = CONCAT('RES', LPAD((SELECT COALESCE(MAX(SUBSTRING(restaurant_id, 4)), 0) + 1 FROM Restaurants), 6, '0'));
END$$

CREATE TRIGGER before_insert_menus
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

CREATE TRIGGER before_insert_payments
BEFORE INSERT ON Payments
FOR EACH ROW
BEGIN
    SET NEW.payment_id = CONCAT('PAY', LPAD((SELECT COALESCE(MAX(SUBSTRING(payment_id, 4)), 0) + 1 FROM Payments), 6, '0'));
END$$

CREATE TRIGGER before_insert_deliveries
BEFORE INSERT ON Deliveries
FOR EACH ROW
BEGIN
    SET NEW.delivery_id = CONCAT('DEL', LPAD((SELECT COALESCE(MAX(SUBSTRING(delivery_id, 4)), 0) + 1 FROM Deliveries), 6, '0'));
END$$

CREATE TRIGGER before_insert_reviews
BEFORE INSERT ON Reviews
FOR EACH ROW
BEGIN
    SET NEW.review_id = CONCAT('REV', LPAD((SELECT COALESCE(MAX(SUBSTRING(review_id, 4)), 0) + 1 FROM Reviews), 6, '0'));
END$$

CREATE TRIGGER before_insert_notifications
BEFORE INSERT ON Notifications
FOR EACH ROW
BEGIN
    SET NEW.notification_id = CONCAT('NOT', LPAD((SELECT COALESCE(MAX(SUBSTRING(notification_id, 4)), 0) + 1 FROM Notifications), 6, '0'));
END$$

CREATE TRIGGER before_insert_logs
BEFORE INSERT ON Logs
FOR EACH ROW
BEGIN
    SET NEW.log_id = CONCAT('LOG', LPAD((SELECT COALESCE(MAX(SUBSTRING(log_id, 4)), 0) + 1 FROM Logs), 6, '0'));
END$$

-- Log Orders
CREATE TRIGGER after_order_insert
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    INSERT INTO Logs (event_description)
    VALUES (CONCAT('Order ', NEW.order_id, ' placed by user ', NEW.user_id));
END$$

-- Log Payments
CREATE TRIGGER after_payment_insert
AFTER INSERT ON Payments
FOR EACH ROW
BEGIN
    INSERT INTO Logs (event_description)
    VALUES (CONCAT('Payment ', NEW.payment_id, ' processed for order ', NEW.order_id));
END$$

-- Log Reviews
CREATE TRIGGER after_review_insert
AFTER INSERT ON Reviews
FOR EACH ROW
BEGIN
    INSERT INTO Logs (event_description)
    VALUES (CONCAT('User ', NEW.user_id, ' reviewed restaurant ', NEW.restaurant_id, ' with rating ', NEW.rating));
END$$

-- Auto-update order status when paid
CREATE TRIGGER after_payment_update
AFTER UPDATE ON Payments
FOR EACH ROW
BEGIN
    IF NEW.status = 'Réussi' THEN
        UPDATE Orders SET status = 'En cours' WHERE order_id = NEW.order_id;
    END IF;
END$$

-- Auto-update delivery status when order is processed
CREATE TRIGGER after_order_update
AFTER UPDATE ON Orders
FOR EACH ROW
BEGIN
    IF NEW.status = 'En cours' THEN
        INSERT INTO Deliveries (order_id, delivery_person, status)
        VALUES (NEW.order_id, NULL, 'En cours de livraison');
    END IF;
END$$

-- Log Notifications
CREATE TRIGGER after_notification_insert
AFTER INSERT ON Notifications
FOR EACH ROW
BEGIN
    INSERT INTO Logs (event_description)
    VALUES (CONCAT('Notification sent to user ', NEW.user_id, ': ', NEW.message));
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER before_insert_carts
BEFORE INSERT ON Carts
FOR EACH ROW
BEGIN
    SET NEW.cart_id = CONCAT('CRT', LPAD((SELECT COALESCE(MAX(SUBSTRING(cart_id, 4)), 0) + 1 FROM Carts), 6, '0'));
END$$

DELIMITER ;




-- Users
INSERT INTO Users (name, prename) VALUES 
('Dupont', 'Jean'),
('Martin', 'Sophie'),
('Bernard', 'Pierre'),
('Petit', 'Marie'),
('Durand', 'Luc');

-- Restaurants
INSERT INTO Restaurants (name) VALUES 
('Le Bon Pain'),
('La Pasta Bella'),
('Burger King'),
('Sushi Palace'),
('Pizza Heaven');

-- Menus
INSERT INTO Menus (name, restaurant_id) VALUES 
('Breakfast Menu', (SELECT restaurant_id FROM Restaurants WHERE name = 'Le Bon Pain')),
('Lunch Specials', (SELECT restaurant_id FROM Restaurants WHERE name = 'Le Bon Pain')),
('Italian Classics', (SELECT restaurant_id FROM Restaurants WHERE name = 'La Pasta Bella')),
('Premium Burgers', (SELECT restaurant_id FROM Restaurants WHERE name = 'Burger King')),
('Sushi Combos', (SELECT restaurant_id FROM Restaurants WHERE name = 'Sushi Palace')),
('Pizza Menu', (SELECT restaurant_id FROM Restaurants WHERE name = 'Pizza Heaven'));

-- Items
INSERT INTO Items (name, menu_id, price) VALUES 
('Croissant', (SELECT menu_id FROM Menus WHERE name = 'Breakfast Menu'), 2.50),
('Coffee', (SELECT menu_id FROM Menus WHERE name = 'Breakfast Menu'), 3.00),
('Sandwich', (SELECT menu_id FROM Menus WHERE name = 'Lunch Specials'), 6.50),
('Salad', (SELECT menu_id FROM Menus WHERE name = 'Lunch Specials'), 5.00),
('Spaghetti Carbonara', (SELECT menu_id FROM Menus WHERE name = 'Italian Classics'), 12.00),
('Lasagna', (SELECT menu_id FROM Menus WHERE name = 'Italian Classics'), 11.50),
('Whopper', (SELECT menu_id FROM Menus WHERE name = 'Premium Burgers'), 8.50),
('Cheeseburger', (SELECT menu_id FROM Menus WHERE name = 'Premium Burgers'), 5.00),
('California Roll', (SELECT menu_id FROM Menus WHERE name = 'Sushi Combos'), 7.50),
('Sashimi Platter', (SELECT menu_id FROM Menus WHERE name = 'Sushi Combos'), 15.00),
('Margherita Pizza', (SELECT menu_id FROM Menus WHERE name = 'Pizza Menu'), 10.00),
('Pepperoni Pizza', (SELECT menu_id FROM Menus WHERE name = 'Pizza Menu'), 12.00);

-- Carts (let triggers generate IDs)
INSERT INTO Carts (user_id) VALUES 
((SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean')),
((SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie')),
((SELECT user_id FROM Users WHERE name = 'Bernard' AND prename = 'Pierre'));

-- Cart Items (using subqueries to get the auto-generated cart_ids)
INSERT INTO Cart_Items (cart_id, item_id, quantity) VALUES 
((SELECT cart_id FROM Carts WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean')), 
 (SELECT item_id FROM Items WHERE name = 'Croissant'), 2),
((SELECT cart_id FROM Carts WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean')), 
 (SELECT item_id FROM Items WHERE name = 'Coffee'), 1),
((SELECT cart_id FROM Carts WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie')), 
 (SELECT item_id FROM Items WHERE name = 'Spaghetti Carbonara'), 1),
((SELECT cart_id FROM Carts WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie')), 
 (SELECT item_id FROM Items WHERE name = 'Lasagna'), 1),
((SELECT cart_id FROM Carts WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Bernard' AND prename = 'Pierre')), 
 (SELECT item_id FROM Items WHERE name = 'Whopper'), 2),
((SELECT cart_id FROM Carts WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Bernard' AND prename = 'Pierre')), 
 (SELECT item_id FROM Items WHERE name = 'Cheeseburger'), 1);

-- Orders
INSERT INTO Orders (user_id, restaurant_id, status) VALUES 
((SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'Le Bon Pain'), 'Livré'),
((SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'La Pasta Bella'), 'En cours'),
((SELECT user_id FROM Users WHERE name = 'Bernard' AND prename = 'Pierre'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'Burger King'), 'En attente'),
((SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'Sushi Palace'), 'Livré'),
((SELECT user_id FROM Users WHERE name = 'Petit' AND prename = 'Marie'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'Pizza Heaven'), 'Annulé');

-- Payments
INSERT INTO Payments (order_id, amount, status) VALUES 
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Le Bon Pain')), 
 15.50, 'Réussi'),
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'La Pasta Bella')), 
 23.50, 'Réussi'),
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Bernard' AND prename = 'Pierre') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Burger King')), 
 22.00, 'En attente'),
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Sushi Palace')), 
 22.50, 'Réussi'),
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Petit' AND prename = 'Marie') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Pizza Heaven')), 
 10.00, 'Echoué');

-- Deliveries
INSERT INTO Deliveries (order_id, delivery_person, status) VALUES 
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Le Bon Pain')), 
 'John Doe', 'Livré'),
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'La Pasta Bella')), 
 'Jane Smith', 'En cours de livraison'),
((SELECT order_id FROM Orders WHERE user_id = (SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean') AND restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Sushi Palace')), 
 'Mike Johnson', 'Livré');

-- Reviews
INSERT INTO Reviews (user_id, restaurant_id, rating) VALUES 
((SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'Le Bon Pain'), 4),
((SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'Sushi Palace'), 5),
((SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'La Pasta Bella'), 3),
((SELECT user_id FROM Users WHERE name = 'Petit' AND prename = 'Marie'), 
 (SELECT restaurant_id FROM Restaurants WHERE name = 'Pizza Heaven'), 2);

-- Notifications
INSERT INTO Notifications (user_id, message, read_status) VALUES 
((SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean'), 
 'Your order has been delivered', TRUE),
((SELECT user_id FROM Users WHERE name = 'Martin' AND prename = 'Sophie'), 
 'Your order is on its way', FALSE),
((SELECT user_id FROM Users WHERE name = 'Bernard' AND prename = 'Pierre'), 
 'Payment pending for your order', FALSE),
((SELECT user_id FROM Users WHERE name = 'Dupont' AND prename = 'Jean'), 
 'Thank you for your review!', TRUE);