# InvetiFi – Unique Inventory Management Tool

A modern, full-stack inventory management solution for small businesses, built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS. This project features JWT authentication, product management, pagination, rate limiting, and a beautiful, responsive UI.

---

## 🚀 Features
- User registration and login (JWT authentication)
- Add, update, and list products (with pagination)
- Secure REST API with rate limiting and validation
- Modern, responsive frontend (React + Tailwind CSS)
- Centralized state management with Redux Toolkit
- OpenAPI/Swagger documentation
- Professional code structure and error handling

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Joi, Swagger
- **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit
- **Other:** dotenv, express-rate-limit, CORS, Docker, Docker Compose

---

## 📦 Project Structure
```
InvetiFi/
  backend/
    ... (Express API, models, controllers, routes, middleware, swagger.json)
  frontend/
    ... (React app, components, store, slices, Tailwind config)
  test/
    test_api.py
  docker-compose.yml
  README.md
  postman_collection.json
```

---

## ⚡ Quick Start

### 1. Clone the repository
```sh
git clone https://github.com/danknoob/InvetiFi.git
cd InvetiFi
```

### 2. Backend Setup
```sh
cd backend
npm install
# Create a .env file (see .env.example)
npm start
```
- The backend runs on `http://localhost:8080` by default.

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```
- The frontend runs on `http://localhost:5173` by default.

---

## 🐳 Docker Setup

**Prerequisite:**
- You must have [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker and Docker Compose) installed on your system.
- Download and install Docker for [Windows/Mac](https://www.docker.com/products/docker-desktop/) or [Linux](https://docs.docker.com/engine/install/).

You can run the entire stack (backend, frontend, and MongoDB) using Docker and Docker Compose.

### **Build and Run with Docker Compose**
```sh
docker-compose up --build
```
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8080
- **MongoDB:** localhost:27017

### **Stopping the Containers**
```sh
docker-compose down
```

---

## 🔑 Environment Variables
Create a `.env` file in the `backend` folder:
```
JWT_SECRET=your_super_secret_jwt_key
MONGO_URI=your_mongodb_connection_string
PORT=8080
```

For the frontend, you can set the API URL in a `.env` file (optional):
```
VITE_API_URL=http://localhost:8080
```

---

## 📚 API Documentation
- Swagger UI: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- See `backend/swagger.json` for full OpenAPI spec.

### Main Endpoints
- `POST   /register` and `/api/auth/register` – Register a new user
- `POST   /login` and `/api/auth/login` – Login and get JWT
- `POST   /products` and `/api/products` – Add a product (auth required)
- `PUT    /products/:id/quantity` and `/api/products/:id/quantity` – Update product quantity (auth required)
- `GET    /products` and `/api/products` – List products (auth required, paginated)

---

## 🧪 Testing

### Automated API Test Script

A Python test script is provided to verify all backend endpoints.

#### **Prerequisites**
- Python 3.6+
- `requests` library (`pip install requests`)

#### **How to Run**
1. Make sure your backend server is running (`npm start` in the `backend` folder).
2. In a new terminal, navigate to the test folder:
   ```sh
   cd test
   python test_api.py
   ```
3. The script will run a series of tests for registration, login, product creation, quantity update, and product listing.

#### **Expected Output**
- Each test will print PASSED or FAILED, with details if a test fails.
- Example:
  ```
  User Registration: PASSED
  Login Test: PASSED
  Add Product: PASSED
  Update Quantity: PASSED, Updated quantity: 15
  Get Products: PASSED (Quantity = 15)
  ```

#### **Troubleshooting**
- If you see 404 errors, make sure your backend exposes both `/register` and `/api/auth/register` (and similar for other endpoints).
- If you see 401 errors, check your JWT secret and token handling.
- If you see 500 errors, check your backend terminal for stack traces.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
[MIT](LICENSE) 