CREATE TABLE order_product (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    CONSTRAINT fk_order
    FOREIGN KEY(order_id) 
	REFERENCES orders(id),
    CONSTRAINT fk_product
    FOREIGN KEY(product_id) 
	REFERENCES products(id)
);