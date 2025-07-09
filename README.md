# React Node Yelp

A full-stack Yelp-like web app built with React, Node.js, Express, and PostgreSQL.

## Features

-   Modern React frontend (Vite, TypeScript, Shadcn UI, Tailwind CSS)
-   Node.js/Express REST API backend
-   PostgreSQL database for persistent storage
-   Full CRUD for restaurants and their reviews
-   Responsive UI with reusable components

## Project Structure

```
react-node-yelp/
  client/   # React frontend (Vite, TypeScript, Shadcn UI, Tailwind CSS)
  server/   # Node.js backend (Express, PostgreSQL)
```

## Getting Started

### Prerequisites

-   Node.js (v18+)
-   PostgreSQL

### Backend Setup

1. **Install dependencies:**
    ```sh
    cd server
    npm install
    ```
2. **Set up your PostgreSQL database and environment variables**
    - Copy `.env.example` in the `server` folder to `.env`, and fill in your database configuration.
3. **Start the backend server:**
    ```sh
    npm start
    ```

### Frontend Setup

1. **Install dependencies:**
    ```sh
    cd client
    npm install
    ```
2. **Start the frontend dev server:**
    ```sh
    npm run dev
    ```

### Running Tests

-   **Backend:**

    Running tests from the `server` directory:

    ```sh
    npm test
    ```

## License

MIT License.
