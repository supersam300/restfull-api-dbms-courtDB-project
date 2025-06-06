import pool from '../config/db.js'; // Ensure your pool is correctly imported

export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const [result] = await pool.query(
      `INSERT INTO User (username, password, role)
       VALUES (?, ?, ?)`,
      [username, password, role]
    );
    res.status(201).json({ user_id: result.insertId, username, role });
  } catch (err) {
    handleDbError(res, err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM User');
    res.json(rows);
  } catch (err) {
    handleDbError(res, err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM User WHERE user_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    handleDbError(res, err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const [result] = await pool.query(
      `UPDATE User SET username = ?, password = ?, role = ?
       WHERE user_id = ?`,
      [username, password, role, req.params.id]
    );
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
    const [result] = await pool.query('DELETE FROM User WHERE user_id = ?', [user_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    handleDbError(res, err);
  }
};
