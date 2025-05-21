import bcrypt from 'bcrypt';
import pool from '../config/db.js';// adjust path based on your project structure

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO User (username, password_hash, role) VALUES (?, ?, ?)',
      [username, password_hash, role]
    );

    res.status(201).json({
      user_id: result.insertId,
      username,
      role
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Username already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};
