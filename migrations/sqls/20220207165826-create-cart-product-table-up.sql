CREATE TABLE cart_product (
    cart_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    CONSTRAINT fk_cart
    FOREIGN KEY(cart_id) 
	REFERENCES carts(id),
    CONSTRAINT fk_product
    FOREIGN KEY(product_id) 
	REFERENCES products(id)
);