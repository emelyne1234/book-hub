# Book-Discrovery Application

**book hub**

The backend for Book Hub is built using Node.js. It provides a RESTful API for managing book data, including functionalities for creating, reading, updating, and deleting books. The backend also supports filtering and searching books by various criteria.

**Table of Contents**

Features

Getting Started

Prerequisites

Installation

API Endpoints

Usage

Acknowledgments

**Features**

RESTful API for managing book data

CRUD operations: Create, Read, Update, Delete

Filtering and searching books by genre, author, publication date, and more

Data storage using MongoDB

**Getting Started**

**Prerequisites**

Before you begin, ensure you have the following installed:

Node.js

npm

MongoDB

**Installation**

Clone the repository:

git clone https://github.com/emelyne1234/book-hub.git

Install dependencies:

npm install

Please make sure your database server is running.

Start the Server
Start the backend server:

npm start

The server will run on the port specified in the .env file (default is 27017).


API Endpoints

The backend API provides the following endpoints:

GET /books: Retrieve a list of all books

GET /books/
: Retrieve details of a specific book
POST /books: Add a new book

PUT /books/
: Update an existing book

DELETE /books/
: Delete a book

Example Requests
Get all books

curl -X GET http://localhost:27017/books
Get a specific book


curl -X GET http://localhost:27017/books/{bookId}
Add a new book


curl -X POST http://localhost:27017/books -H "Content-Type: application/json" -d '{"title": "New Book", "author": "Author Name"}'
Update a book


curl -X PUT http://localhost:27017/books/{bookId} -H "Content-Type: application/json" -d '{"title": "Updated Book", "author": "Updated Author"}'
Delete a book


curl -X DELETE http://localhost:27017/books/{bookId}

Usage
Please make sure the backend server is running.

Use an API client like Postman or cURL to interact with the API endpoints.

**Acknowledgements**

Node.js for building the backend.

MongoDB for data storage.
