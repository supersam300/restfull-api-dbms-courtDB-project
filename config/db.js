import mysql from 'mysql2/promise.js'; //i have created a pool here where the data base is accessed

const pool = mysql.createPool(
{  
    host:  process.env.DB_HOST,
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:  process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool;