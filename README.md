# MySqlSemend
# Court Management System Backend (Node.js + MySQL)

This is a backend API for managing a Court Management System, built using Node.js, Express, and MySQL. It provides full CRUD operations for all entities such as Courts, Judges, Lawyers, Case Details, Plaintiffs, Defendants, Case Parties, Verdicts, and a MasterTable for centralized referencing.

# Features

-Full CRUD operations for:
-Courts
-Judges
-Lawyers
-Case Details
-Plaintiffs
-Defendants
-Case Parties
-Verdicts
-Case Lawyers
-MasterTable support with foreign keys
-separate routes and controllers
-CORS support to connect with frontend 

# Technologies Used
Node.js
Express.js
MySQL

# Installation

# Clone the repository:
git clone https://github.com/yourusername/court-management-system.git
cd court-management-system

# Install dependencies:
npm install

# Set up the database:
CREATE DATABASE CourtSystem;

# Configure your database credentials
In a .env file 

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=CourtSystem
Start the server
npm run dev