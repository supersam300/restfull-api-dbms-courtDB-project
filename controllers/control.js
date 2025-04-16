import pool from '../config/db.js';

// CREATE
export const createCourt = async (req, res) => 
    {
  const { court_name, location, court_type } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Court (court_name, location, court_type) VALUES (?, ?, ?)',
      [court_name, location, court_type]
    );
    res.status(201).json({ court_id: result.insertId, court_name, location, court_type }); //the status just gives the status of the query liek 404:not found.
    //here 201 means OK and 500 means error from server side, big sad :(
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const getCourts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Court');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getCourtById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Court WHERE court_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Court not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateCourt = async (req, res) => {
  const { court_name, location, court_type } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Court SET court_name = ?, location = ?, court_type = ? WHERE court_id = ?',
      [court_name, location, court_type, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Court not found' });
    res.json({ message: 'Court updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteCourt = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Court WHERE court_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Court not found' });
    res.json({ message: 'Court deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
//this is just for courts i am sad:(

};
