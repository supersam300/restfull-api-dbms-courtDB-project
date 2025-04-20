import pool from '../config/db.js';

// CREATE Court
export const createCourt = async (req, res) => {
  const { court_id, court_name, location, court_type } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Court (court_id, court_name, location, court_type) VALUES (?, ?, ?, ?)',
      [court_id, court_name, location, court_type]
    );
    res.status(201).json({ court_id, court_name, location, court_type });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ all Courts
export const getCourts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Court');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one Court by ID
export const getCourtById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Court WHERE court_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Court not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Court
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

// DELETE Court
export const deleteCourt = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Court WHERE court_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Court not found' });
    res.json({ message: 'Court deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE Judge
export const createJudge = async (req, res) => {
  const { name, experience_years, court_id } = req.body;
  try {
    console.log("Creating judge with:", req.body); // DEBUG
    const [result] = await pool.query(
      'INSERT INTO Judge (name, experience_years, court_id) VALUES (?, ?, ?)',
      [name, experience_years, court_id]
    );
    res.status(201).json({
      judge_id: result.insertId,
      name,
      experience_years,
      court_id
    });
  } catch (err) {
    console.error("Error in createJudge:", err); // <-- See error here
    res.status(500).json({ error: err.message });
  }
};

// READ all Judges
export const getJudges = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Judge');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one Judge by ID
export const getJudgebyID = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Judge WHERE judge_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Judge not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Judge
export const updateJudge = async (req, res) => {
  const { name, experience_years, court_id } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Judge SET name = ?, experience_years = ?, court_id = ? WHERE judge_id = ?',
      [name, experience_years, court_id, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Judge not found' });
    res.json({ message: 'Judge updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Judge
export const deleteJudge = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Judge WHERE judge_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Judge not found' });
    res.json({ message: 'Judge deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- LAWYER -------------------- //

// CREATE Lawyer
export const createLawyer = async (req, res) => {
  const { name, specialization, experience_years } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Lawyer (name, specialization, experience_years) VALUES (?, ?, ?)',
      [name, specialization, experience_years]
    );
    res.status(201).json({
      lawyer_id: result.insertId,
      name,
      specialization,
      experience_years
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ all Lawyers
export const getLawyers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Lawyer');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one Lawyer by ID
export const getLawyerById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Lawyer WHERE lawyer_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Lawyer not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Lawyer
export const updateLawyer = async (req, res) => {
  const { name, specialization, experience_years } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Lawyer SET name = ?, specialization = ?, experience_years = ? WHERE lawyer_id = ?',
      [name, specialization, experience_years, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Lawyer not found' });
    res.json({ message: 'Lawyer updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Lawyer
export const deleteLawyer = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Lawyer WHERE lawyer_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Lawyer not found' });
    res.json({ message: 'Lawyer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
