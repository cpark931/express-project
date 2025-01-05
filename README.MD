# **Airbnb API Project**

## **Overview**

This project implements a fully functional backend for an Airbnb-like application, featuring user authentication, spot management, reviews, bookings, and associated image functionalities. The backend is built using **Node.js**, **Express**, and **Sequelize**, following RESTful API principles.

---

## **Features**

- **User Authentication and Authorization**
  - User sign-up and login with hashed passwords and JWT authentication.
  - Middleware for role-based access control.

- **Spot Management**
  - CRUD operations for spots.
  - Query filters for spots (pagination, price, and location).

- **Reviews and Ratings**
  - Add, edit, and delete reviews for spots.
  - Include ratings and associated images.

- **Bookings**
  - Book spots for specified dates.
  - Manage and modify existing bookings.

- **Image Management**
  - Upload and associate images with spots and reviews.
  - Delete images with proper authorization.

---

## **Database Schema Design**

### **Users**
- `id`: Primary Key
- `firstName`: String, not null
- `lastName`: String, not null
- `email`: String, unique, not null
- `username`: String, unique, not null
- `hashedPassword`: String, not null
- Timestamps: `createdAt`, `updatedAt`

### **Spots**
- `id`: Primary Key
- `ownerId`: Foreign Key (Users), not null
- `address`: String, not null
- `city`: String, not null
- `state`: String, not null
- `country`: String, not null
- `lat`: Decimal, not null
- `lng`: Decimal, not null
- `name`: String, not null
- `description`: String, not null
- `price`: Decimal, not null
- Timestamps: `createdAt`, `updatedAt`

### **Reviews**
- `id`: Primary Key
- `spotId`: Foreign Key (Spots), not null
- `userId`: Foreign Key (Users), not null
- `review`: Text, not null
- `stars`: Integer, not null (1–5)
- Timestamps: `createdAt`, `updatedAt`

### **Bookings**
- `id`: Primary Key
- `spotId`: Foreign Key (Spots), not null
- `userId`: Foreign Key (Users), not null
- `startDate`: Date, not null
- `endDate`: Date, not null
- Timestamps: `createdAt`, `updatedAt`

### **SpotImages**
- `id`: Primary Key
- `spotId`: Foreign Key (Spots), not null
- `url`: String, not null
- `preview`: Boolean, not null

### **ReviewImages**
- `id`: Primary Key
- `reviewId`: Foreign Key (Reviews), not null
- `url`: String, not null

---

## **API Documentation**

### **Base URL**
`http://localhost:8000/api`

### **Endpoints**

#### **User Authentication**
- **POST** `/users`: Sign up a new user.
- **POST** `/session`: Log in a user.
- **GET** `/session`: Get the current user.
- **DELETE** `/session`: Log out the current user.

#### **Spots**
- **GET** `/spots`: Get all spots.
- **POST** `/spots`: Create a new spot.
- **GET** `/spots/:id`: Get details of a specific spot.
- **PUT** `/spots/:id`: Edit a specific spot.
- **DELETE** `/spots/:id`: Delete a specific spot.

#### **Reviews**
- **GET** `/reviews/current`: Get all reviews by the current user.
- **POST** `/spots/:id/reviews`: Create a review for a spot.
- **PUT** `/reviews/:id`: Edit a specific review.
- **DELETE** `/reviews/:id`: Delete a specific review.

#### **Bookings**
- **GET** `/bookings/current`: Get all bookings by the current user.
- **POST** `/spots/:id/bookings`: Create a booking for a spot.
- **PUT** `/bookings/:id`: Edit a booking.
- **DELETE** `/bookings/:id`: Delete a booking.

#### **Images**
- **POST** `/spots/:id/images`: Add an image to a spot.
- **DELETE** `/spot-images/:id`: Delete a spot image.
- **POST** `/reviews/:id/images`: Add an image to a review.
- **DELETE** `/review-images/:id`: Delete a review image.

---

## **Setup Instructions**

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/).
2. Install [PostgreSQL](https://www.postgresql.org/).

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```


2. Navigate to the project directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

### **Database Setup**
1. Create a .env file in the backend directory:
plaintext
PORT=8000
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=airbnb_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=604800


2. Set up the database:
```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

### **Start the Server**
1. Run the server:
```bash
npm start
```
Access the API at http://localhost:8000/api.

### **Testing**
Use Postman to test all API endpoints. Example request and response formats are provided in the API Documentation section.

Contributors
Developer: Chris Park
Contact: cpark931@gmail.com
