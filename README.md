# node_market

 a test application for using node.js postgress jasmine.js typescript

## HOW TO SETUP DATABASE

- open psql
- create new database user running CREATE USER miro WITH PASSWORD 'password';
- create new database by running CREATE DATABASE market;
- create test database by running CREATE DATABASE market_test;
- grant all permissions to user by running GRANT ALL PRIVILEGES ON DATABASE market TO miro;
- grant all permissions to user by running GRANT ALL PRIVILEGES ON DATABASE market_test TO miro;

## HOW TO USE

- install db-migrate globally
- create .env file with the below variables
- create database and database users and update the database.json , .env and src/database.ts file with the your database name , username , password
- run npm install
- run npm run build
- run npm run migrate
- run npm run start

## ENVIRONMENTAL VARIABLES

- ENV
- PORT = 3000
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_ PORT = 5432
- POSTGRES_TEST_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- SALT_ROUNDS
- BCRYPT_PASSWORD
- TOKEN_SECRET

## END POINTS

### CATEGORIES

- method post /api/categories/create
- method get /api/categories
- method put /api/categories/update
- method delete /api/categories/delete

### USERS

- method post /api/users/create
- method get /api/users
- method put /api/users/update
- method delete /api/users/delete

### CARTS

- method post /api/carts/create
- method get /api/carts
- method put /api/carts/update
- method delete /api/carts/delete

### ORDERS

- method post /api/orders/create
- method get /api/orders
- method put /api/orders/update
- method delete /api/orders/

### PRODUCTS

- method post /api/products/create
- method get /api/products
- method put /api/products/update
- method delete /api/products/delete
