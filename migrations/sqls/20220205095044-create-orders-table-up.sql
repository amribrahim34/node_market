CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER,
    status BOOLEAN DEFAULT false,
    CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	REFERENCES users(id)
    );