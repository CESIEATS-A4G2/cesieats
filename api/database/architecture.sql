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