🍕 Pizza Delivery API - Routes Overview
This document provides a summary of all the available API routes for the Pizza Delivery Service.

Authentication Routes

POST	/users/signup	Register a new user (admin or customer)	Public
POST	/users/login	Log in with username and password	Public

Example - Login:

Request Body:
{
  "username": "customer1",
  "password": "mypassword"
}
Response:
{
  "token": "jwt-token-here",
  "role": "customer"
}


Pizza Routes
GET	/pizzas	Get all available pizzas	Public
POST	/pizzas	Add a new pizza (admin only)	Admin
Example - Adding a Pizza (Admin only):


Request Body:
{
  "name": "Veggie Delight",
  "toppings": ["Mushrooms", "Spinach", "Onions", "Bell Peppers", "Mozzarella Cheese"],
  "sizes": [
    {"size": "Small", "price": 9},
    {"size": "Medium", "price": 11},
    {"size": "Large", "price": 13}
  ]
}
Response:
{
  "message": "Pizza added successfully"
}


Order Routes
POST	/orders	Place a new order (customers only)	Customer
GET	/orders	Get all orders (admin only)	Admin
PATCH	/orders/:id	Update an order's status (admin)	Admin
Example - Placing an Order (Customer):
Request Body:
{
  "pizzaId": "67113e9fb009332d21ac6ec7",
  "size": "Large",
  "quantity": 2
}
Response:
{
  "message": "Order placed successfully",
  "totalPrice": 26
}


Example - Updating Order Status (Admin):
Request Body:
{
  "status": "delivered"
}
Response:
{
  "message": "Order status updated"
}


User Routes
GET	/users	Get all users (admin only)	Admin
GET	/users/:id	Get a single user by ID	Admin
