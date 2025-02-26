# Food API Service - Express TypeScript Implementation

This repository is the solution for the **Food API Service Module**. It provides a fully functional backend server built with ExpressJS and TypeScript that implements a complete set of CRUD interfaces for managing food items and their ingredients, along with simple database integration for data persistence.

## Task Overview

- **CRUD Interface for Foods:**
  - **Create a Food:** `POST /api/foods`
  - **List Foods with Basic Filters:** `GET /api/foods`
  - **Get Details of a Food:** `GET /api/foods/:id`
  - **Update Food Details:** `PUT /api/foods/:id`
  - **Delete a Food:** `DELETE /api/foods/:id`
- **Database Integration:**  
  The server connects to a SQLite database for easy and local implementation. The database configuration is managed via environment variables.
- **TypeScript & ExpressJS:**  
  The entire application is developed using TypeScript to ensure type safety and maintainability.

## Features

- **CRUD Endpoints:** All basic operations (Create, Read, Update, Delete) for food items are implemented.
- **Ingredient Management:** Food items can include multiple associated ingredients.
- **Filtering:** The list endpoint supports basic filtering options to retrieve specific subsets of food data.
- **Database Support:** Easily switch between different database engines by configuring environment variables (currently using SQLite for local implementation).
- **Environment Configuration:** Managed through a `.env` file for easy setup.
- **Type Safety:** Full TypeScript support throughout the codebase.
- **Security & Performance:** Integrated middleware ensures secure and performant API operations.

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js (latest LTS version recommended) installed.
- **Database:** Set up your preferred database. For local implementation, SQLite is used. Database credentials and connection details should be provided in the environment configuration.

### Environment Configuration

1. **Create Environment File:**
   Copy the provided `.env.example` to create your `.env` file:

   ```bash
   cp .env.example .env
   ```

2. **Configure Environment Variables:**
   Edit the `.env` file to set your database credentials, server port, and any other necessary configurations:
   ```ini
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   ```

### Running the Application

- **Development Mode:**
  Launch the server in development mode (with auto-reloading):

  ```bash
  npm run dev
  ```

- **Production Mode:**
  Build the project and start the server:
  ```bash
  npm run build && npm run start
  ```

## API Endpoints Overview

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| POST   | `/api/foods`     | Create a new food item                   |
| GET    | `/api/foods`     | List food items with optional filters    |
| GET    | `/api/foods/:id` | Retrieve details of a specific food item |
| PUT    | `/api/foods/:id` | Update details of a food item            |
| DELETE | `/api/foods/:id` | Delete a food item                       |

## Flow of Execution

Below is a diagram (using Mermaid syntax) illustrating the execution flow:

```mermaid
flowchart TD
    A[User performs an action on the website] --> B[Client Application]
    B --> C[Dispatch API Request (e.g., POST /api/foods)]
    C --> D[API Gateway / Load Balancer]
    D --> E[Authentication & Authorization Middleware]
    E --> F[Food API Endpoint]
    F --> G[Food Service Layer]
    G --> H[Food Repository]
    H --> I[Database (Food & Ingredient Tables)]
    G --> J[Real-Time Notification Service (optional)]
    J --> K[Connected Clients (Live updates)]
    F --> L[Return API Response]
```

## Additional Information

- **Database Persistence:**
  The server integrates with a simple database. Adjust your connection settings in the `.env` file to suit your preferred database system.

- **Testing:**
  Comprehensive tests have been set up to verify endpoint functionality and overall application reliability.

- **Code Quality:**
  Linting, formatting, and pre-commit hooks ensure that the codebase maintains high quality and consistency throughout development.

## Feedback and Contributions

This project was developed as a solution for the Food API Service module. Your feedback is welcome, and any contributions or suggestions for improvement are greatly appreciated. Please open an issue or submit a pull request if you have ideas or enhancements.

---

### Additional Comments

- **Scalability & Performance:**
  Consider implementing caching (e.g., with Redis) for high-traffic endpoints and monitoring API performance.
- **Security:**
  Implement robust authentication and authorization mechanisms to protect against unauthorized data tampering.
- **Real-Time Updates:**
  Future improvements could include integration with WebSockets or Pub/Sub systems for live updates.
- **Extensibility:**
  The module can be extended to support advanced filtering, pagination, and additional relationships (e.g., categories or user reviews).
