# node_market

 a test application for using node.js postgress jasmine.js typescript

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
- PORT
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_TEST_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- SALT_ROUNDS
- BCRYPT_PASSWORD

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
