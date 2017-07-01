

-- SELECT * FROM products;
UPDATE departments SET totalSales=10000 WHERE department_id =1;
UPDATE departments SET totalSales=4500 WHERE department_id =2;
UPDATE departments SET totalSales=1000 WHERE department_id =3;
UPDATE departments SET totalSales=6300 WHERE department_id =4;
UPDATE departments SET totalSales=9000 WHERE department_id =5;
UPDATE departments SET totalSales=12000 WHERE department_id =6;
UPDATE departments SET totalSales=2400 WHERE department_id =7;
UPDATE departments SET totalSales=2000 WHERE department_id =8;
UPDATE departments SET totalSales=5150 WHERE department_id =9;
UPDATE departments SET totalSales=40000 WHERE department_id =10;



SELECT * FROM departments;
SELECT * FROM products;

INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Electronics", 1000, 10000);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Home Health", 860, 4500);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Home", 600, 1000);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Cookware", 1200, 6300);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Food", 1100, 9000);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Decor", 850, 12000);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Toys", 1300, 2400);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Office Supplies", 200, 2000);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Movies", 550, 5150);
INSERT INTO departments (department_name, over_head_costs, totalSales) VALUES ("Books", 960, 40000);

CREATE TABLE departments(
	department_id INTEGER auto_increment NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    over_head_costs DECIMAL,
    PRIMARY KEY(department_id)
);

SHOW TABLES;

CREATE TABLE products(
	item_id INTEGER auto_increment NOT NULL,
    pName VARCHAR (30),
    dName VARCHAR (30),
    price DECIMAL,
    stock_quantity INTEGER,
    product_sales DECIMAL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Laptop", "Electronics", 1300.00, 18, 1300);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Cell Phone", "Electronics", 750.00, 92, 12000);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Tooth Brush", "Home Health", 2.50, 100, 300);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Box Fan", "Home", 30.00, 94, 1800);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Double Ply Toilet Paper", "Home Health", 350.00, 100, 1500);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Cast Iron Pan", "Cookware", 25.00, 100, 2000);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Bananas", "Food" , 2.00, 100, 1900);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Towels", "Home", 5.00, 100, 1700);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Bottled Water","Food", 4.00, 280, 1200);
INSERT INTO products (pName, dName, price, stock_quantity, product_sales) VALUES ("Abstract Water Painting", "Decor", 350.00, 30, 1100);



SELECT * FROM products;

ALTER TABLE departments
ADD totalSales DECIMAL;

CREATE VIEW bamazon.totalProfits AS SELECT department_id, department_name, over_head_costs, totalSales, totalSales-over_head_costs AS totalProfit FROM departments;
