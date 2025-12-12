# Stock Management System

A full-stack application to manage products, stock transactions, and adjustments. Built with **React** (frontend) and **Node.js/Express** (backend) with **PostgreSQL** database.

## Features

- **Product Management**: Add, update, and track products.
- **Stock Transactions**: Record stock in/out transactions.
- **Stock Adjustments**: Adjust product quantities with reasons.
- **Dashboard**: View total products, low stock alerts, and recent activities.
- **Responsive UI**: Built with Tailwind CSS for a clean interface.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, Sequelize ORM
- **Database**: PostgreSQL
- **Version Control**: Git

## Installation

### Backend
```bash
cd backend
npm install
cp .env.example .env
# update database credentials in .env
npx sequelize db:create
npx sequelize db:migrate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Usage

1. Open the frontend in your browser (default: `http://localhost:3000`).
2. Navigate to **Products**, **Transactions**, or **Adjustments**.
3. Use the dashboard to monitor stock levels and recent activities.

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request


