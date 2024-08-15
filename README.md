
# DevPath Learning Backend

This is the backend for the DevPath Learning platform, built with Node.js, Express, and Sequelize. It provides RESTful API services for user authentication, database interactions, and other core functionalities.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Documentation](#documentation)

## Prerequisites

Ensure that you have the following software installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **MySQL** (v5.x or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/devpath-learning-be.git
   cd devpath-learning-be
   ```

2. **Install Node.js dependencies:**

   Make sure you are in the project directory and run:

   ```bash
   npm install
   ```

## Database Setup

1. **Create a MySQL database:**

   Log in to your MySQL server and create a new database:

   ```sql
   CREATE DATABASE devpath_learning;
   ```

2. **Set up the database connection:**

   Open the `.env` file and set the following variables:

   ```bash
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=devpath_learning
   ```

   Replace `your-username`, `your-password`, and `devpath_learning` with your MySQL credentials and the database name.

## Running the Application

1. **Start the server:**

   Run the following command in the project root directory:

   ```bash
   node main.js
   ```

2. **Access the API:**

   The server will start on `http://localhost:3000` by default. You can test the API endpoints using tools like Postman or Curl.


## Documentation

For more detailed documentation, please refer to the [DevPath Learning Backend Documentation](https://docs.google.com/document/d/1mxraEra432O3MUNRKLnMH_70aADrE1Nb5_v4M94PuX8/edit?usp=sharing).
