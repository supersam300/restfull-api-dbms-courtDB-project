import mysql from 'mysql2/promise.js'; //i have created a pool here where the data base is accessed

const pool = mysql.createPool(
{  
    host:'localhost',
    user:'root',
    password:'shlok@22',
    database:'CourtSystem',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool;