# Movie Archive API

REST API web server for managing movie information, built using Express.js and Sequelize ORM.

## Project Architecture

The project is implemented using **Layered Architecture**, which ensures clear separation of concerns:


### Layer Description:

- **Controllers** - receive HTTP requests, call services, and return responses
- **Services** - contain application business logic
- **Repositories** - abstraction for database operations through Sequelize
- **Models** - Sequelize models for movies and users
- **DTOs** - objects for input data validation using class-validator

## Technologies

* **Express.js** – Web server
* **Sequelize** – ORM for SQLite
* **SQLite** – Lightweight DB
* **Docker** – Containerization
* **JWT** – For authentication
* **Multer** – File upload handling
* **class-validator** – DTO validation

## Features

### Movie Information:
1. Unique identifier
2. Movie title
3. Release year
4. Format (VHS, DVD, Blu-ray)
5. List of actors

### Main Functions:
- User authentication (JWT)
- CRUD operations for movies
- Search movies by title
- Search movies by actor name
- Sort movies by title
- Import movies from text file

##  API Endpoints

### Authentication
- **POST /api/v1/auth/users** - Register new user
- **POST /api/v1/auth/sessions** - Login

### Movies
- **POST /api/v1/movies** - Add a new movie
- **GET /api/v1/movies** - Get all movies (with filtering and sorting)
- **GET /api/v1/movies/:id** - Get movie by ID
- **PATCH /api/v1/movies/:id** - Update movie information
- **DELETE /api/v1/movies/:id** - Delete movie
- **POST /api/v1/movies/import** - Upload file with movies

### Query parameters for GET /api/v1/movies:
- `title` - search by movie title
- `actor` - search by actor name
- `year` - filter by release year
- `format` - filter by format
- `sort` - sorting

## Environment Variables
Create .env file in project root:
```
PORT=
JWT_SECRET=
```

## Docker

### Run with Docker

```bash
docker run --name movies -p 8000:8050 -e APP_PORT=8050 alinaa23/movies
```

### Build Docker image

```bash
git clone https://github.com/alinaa36/Movies_Archive

# Build image
docker build -t movie your_super_account/movies .

# Run container
docker run --name movies -p 8000:8050 -e APP_PORT=8050 your_super_account/movies
```

## Local

```bash
npm install
```
```bash
npm run start:dev
```
