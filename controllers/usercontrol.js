import pool from '../config/db.js';
import bcrypt  from 'bcrypt'; // Import bcrypt for password hashing

// Helper for DB error handling
function handleDbError(res, err) {
  console.error(err);
  res.status(500).json({ error: 'Database error.' });
}

// Register user (with password hashing)
export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `INSERT INTO user (username, password, role) VALUES (?, ?, ?)`,
      [username, hashedPassword, role]
    );
    res.status(201).json({ user_id: result.insertId, username, role });
  } catch (err) {
    handleDbError(res, err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id, username, role FROM user');
    res.json(rows);
  } catch (err) {
    handleDbError(res, err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id, username, role FROM user WHERE user_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    handleDbError(res, err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    let query, params;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = `UPDATE user SET username = ?, password = ?, role = ? WHERE user_id = ?`;
      params = [username, hashedPassword, role, req.params.id];
    } else {
      query = `UPDATE user SET username = ?, role = ? WHERE user_id = ?`;
      params = [username, role, req.params.id];
    }
    const [result] = await pool.query(query, params);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    handleDbError(res, err);
  }
};

export const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  if (!user_id || isNaN(Number(user_id))) {
    return res.status(400).json({ error: 'User ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM user WHERE user_id = ?', [user_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    handleDbError(res, err);
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query(
      'SELECT user_id, username, password, role FROM user WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    delete user.password;
    res.json({ message: 'Login successful', user });
  } catch (err) {
    handleDbError(res, err);
  }
};
