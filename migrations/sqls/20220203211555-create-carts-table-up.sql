CREATE TABLE carts (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	REFERENCES users(id),
    CONSTRAINT fk_product
    FOREIGN KEY(product_id) 
	REFERENCES products(id)
    );