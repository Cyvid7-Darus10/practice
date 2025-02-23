# Crude Server - Express TypeScript Implementation

This repository is the solution for **Problem 5: A Crude Server**. It provides a fully functional backend server built with ExpressJS and TypeScript that implements a complete set of CRUD interfaces, along with a simple database integration for data persistence.

## Task Overview

- **CRUD Interface:**
  - **Create a Resource:** `POST /api/resources`
  - **List Resources with Basic Filters:** `GET /api/resources`
  - **Get Details of a Resource:** `GET /api/resources/:id`
  - **Update Resource Details:** `PUT /api/resources/:id`
  - **Delete a Resource:** `DELETE /api/resources/:id`
- **Database Integration:**  
  The server connects to a simple database to persist data. The database configuration is managed via environment variables.
- **TypeScript & ExpressJS:**  
  The entire application is developed using TypeScript to ensure type safety and maintainability.

## Features

- **CRUD Endpoints:** All basic operations (Create, Read, Update, Delete) are implemented.
- **Filtering:** List endpoint supports basic filtering options to retrieve specific subsets of data.
- **Database Support:** Easily switch between different database engines (SQLite, PostgreSQL, MySQL, etc.) by configuring environment variables.
- **Environment Configuration:** Managed through a `.env` file for easy setup.
- **Type Safety:** Full TypeScript support throughout the codebase.
- **Security & Performance:** Integrated middleware for secure and performant API operations.

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js (latest LTS version recommended) installed.
- **Database:** Set up your preferred database (e.g., SQLite, PostgreSQL, MySQL). Database credentials and connection details should be provided in the environment configuration.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/crude-server.git
   cd crude-server
   ```

2. **Install Dependencies:**
   ```bash
   npm ci
   ```

### Environment Configuration

1. **Create Environment File:**
   Copy the provided `.env.template` to create your `.env` file:
   ```bash
   cp .env.template .env
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

| Method  | Endpoint              | Description                           |
|---------|-----------------------|---------------------------------------|
| POST    | `/api/resources`      | Create a new resource                 |
| GET     | `/api/resources`      | List resources with optional filters  |
| GET     | `/api/resources/:id`  | Retrieve details of a specific resource|
| PUT     | `/api/resources/:id`  | Update resource details               |
| DELETE  | `/api/resources/:id`  | Delete a resource                     |

## Additional Information

- **Database Persistence:**  
  The server integrates with a simple database. Adjust your connection settings in the `.env` file to suit your preferred database system.

- **Testing:**  
  Comprehensive tests have been set up to verify endpoint functionality and overall application reliability.

- **Code Quality:**  
  Linting, formatting, and pre-commit hooks ensure that the codebase maintains high quality and consistency throughout development.

## Feedback and Contributions

This project was developed specifically as a solution to Problem 5: A Crude Server. Your feedback is welcome, and any contributions or suggestions for improvement are greatly appreciated. Please open an issue or submit a pull request if you have ideas or enhancements.