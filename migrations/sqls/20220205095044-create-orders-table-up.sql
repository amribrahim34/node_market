CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER,
    quantity INTEGER,
    products INTEGER,
    status INTEGER,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	REFERENCES users(id)
    );