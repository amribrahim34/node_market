CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    details VARCHAR(255),
    price INTEGER,
    category_id INTEGER,
    CONSTRAINT fk_category
    FOREIGN KEY(category_id) 
	REFERENCES categories(id)
    );