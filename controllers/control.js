import pool from '../config/db.js';

// ================== COMMON UTILS ==================
const handleDbError = (res, err) => res.status(500).json({ error: err.message });

// ================== COUNT ENDPOINTS ==================
export const countCourts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Court');
    res.json({ count: rows[0].count });
  } catch (err) { handleDbError(res, err); }
};

export const countJudges = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Judge');
    res.json({ count: rows[0].count });
  } catch (err) { handleDbError(res, err); }
};

export const countLawyers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Lawyer');
    res.json({ count: rows[0].count });
  } catch (err) { handleDbError(res, err); }
};

export const countCases = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM CaseDetails');
    res.json({ count: rows[0].count });
  } catch (err) { handleDbError(res, err); }
};

export const countVerdicts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM Verdict');
    res.json({ count: rows[0].count });
  } catch (err) { handleDbError(res, err); }
};

// ================== COURT OPERATIONS ==================
export const createCourt = async (req, res) => {
  try {
    const { court_name, location, court_type } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Court (court_name, location, court_type) VALUES (?, ?, ?)',
      [court_name, location, court_type]
    );
    res.status(201).json({ court_id: result.insertId, court_name, location, court_type });
  } catch (err) { handleDbError(res, err); }
};

export const getCourts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Court');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getCourtById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Court WHERE court_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Court not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateCourt = async (req, res) => {
  const { court_name, location, court_type } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Court SET court_name = ?, location = ?, court_type = ? WHERE court_id = ?',
      [court_name, location, court_type, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Court not found' });
    res.json({ message: 'Court updated' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteCourt = async (req, res) => {
  const court_id = req.params.id;
  if (!court_id || isNaN(Number(court_id))) {
    return res.status(400).json({ error: 'Court ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Court WHERE court_id = ?', [court_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Court not found.' });
    res.json({ message: 'Court deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== JUDGE OPERATIONS ==================
export const createJudge = async (req, res) => {
  try {
    const { name, experience_years } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Judge (name, experience_years) VALUES (?, ?)',
      [name, experience_years]
    );
    res.status(201).json({ judge_id: result.insertId, name, experience_years });
  } catch (err) { handleDbError(res, err); }
};

export const getJudges = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Judge');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getJudgeById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Judge WHERE judge_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Judge not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateJudge = async (req, res) => {
  const { name, experience_years } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Judge SET name = ?, experience_years = ? WHERE judge_id = ?',
      [name, experience_years, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Judge not found' });
    res.json({ message: 'Judge updated' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteJudge = async (req, res) => {
  const judge_id = req.params.id;
  if (!judge_id || isNaN(Number(judge_id))) {
    return res.status(400).json({ error: 'Judge ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Judge WHERE judge_id = ?', [judge_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Judge not found.' });
    res.json({ message: 'Judge deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== CASE-JUDGE MANY-TO-MANY ==================
export const assignJudgeToCase = async (req, res) => {
  try {
    const { caseId, judgeId } = req.params;
    await pool.query(
      'INSERT IGNORE INTO Case_Judge (case_id, judge_id) VALUES (?, ?)',
      [caseId, judgeId]
    );
    res.json({ message: 'Judge assigned to case' });
  } catch (err) { handleDbError(res, err); }
};

export const removeJudgeFromCase = async (req, res) => {
  try {
    const { caseId, judgeId } = req.params;
    await pool.query(
      'DELETE FROM Case_Judge WHERE case_id = ? AND judge_id = ?',
      [caseId, judgeId]
    );
    res.json({ message: 'Judge removed from case' });
  } catch (err) { handleDbError(res, err); }
};

export const getJudgesForCase = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT j.* FROM Judge j JOIN Case_Judge cj ON j.judge_id = cj.judge_id WHERE cj.case_id = ?`,
      [req.params.caseId]
    );
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getCasesForJudge = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.* FROM CaseDetails c JOIN Case_Judge cj ON c.case_id = cj.case_id WHERE cj.judge_id = ?`,
      [req.params.judgeId]
    );
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

// ================== LAWYER OPERATIONS ==================
export const createLawyer = async (req, res) => {
  try {
    const { name, specialization, experience_years } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Lawyer (name, specialization, experience_years) VALUES (?, ?, ?)',
      [name, specialization, experience_years]
    );
    res.status(201).json({ lawyer_id: result.insertId, name, specialization, experience_years });
  } catch (err) { handleDbError(res, err); }
};

export const getLawyers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Lawyer');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getLawyerById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Lawyer WHERE lawyer_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Lawyer not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateLawyer = async (req, res) => {
  const { name, specialization, experience_years } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Lawyer SET name = ?, specialization = ?, experience_years = ? WHERE lawyer_id = ?',
      [name, specialization, experience_years, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Lawyer not found' });
    res.json({ message: 'Lawyer updated' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteLawyer = async (req, res) => {
  const lawyer_id = req.params.id;
  if (!lawyer_id || isNaN(Number(lawyer_id))) {
    return res.status(400).json({ error: 'Lawyer ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Lawyer WHERE lawyer_id = ?', [lawyer_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Lawyer not found.' });
    res.json({ message: 'Lawyer deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== PLAINTIFF OPERATIONS ==================
export const createPlaintiff = async (req, res) => {
  const { name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Plaintiff (name, address, contact_number) VALUES (?, ?, ?)',
      [name, address, contact_number]
    );
    res.status(201).json({ plaintiff_id: result.insertId, name, address, contact_number });
  } catch (err) { handleDbError(res, err); }
};

export const getPlaintiffs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Plaintiff');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getPlaintiffById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Plaintiff WHERE plaintiff_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Plaintiff not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updatePlaintiff = async (req, res) => {
  const { name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Plaintiff SET name = ?, address = ?, contact_number = ? WHERE plaintiff_id = ?',
      [name, address, contact_number, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Plaintiff not found' });
    res.json({ message: 'Plaintiff updated successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const deletePlaintiff = async (req, res) => {
  const plaintiff_id = req.params.id;
  if (!plaintiff_id || isNaN(Number(plaintiff_id))) {
    return res.status(400).json({ error: 'Plaintiff ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Plaintiff WHERE plaintiff_id = ?', [plaintiff_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Plaintiff not found.' });
    res.json({ message: 'Plaintiff deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== DEFENDANT OPERATIONS ==================
export const createDefendant = async (req, res) => {
  const { name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Defendant (name, address, contact_number) VALUES (?, ?, ?)',
      [name, address, contact_number]
    );
    res.status(201).json({ defendant_id: result.insertId, name, address, contact_number });
  } catch (err) { handleDbError(res, err); }
};

export const getDefendants = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Defendant');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getDefendantById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Defendant WHERE defendant_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Defendant not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateDefendant = async (req, res) => {
  const { name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Defendant SET name = ?, address = ?, contact_number = ? WHERE defendant_id = ?',
      [name, address, contact_number, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Defendant not found' });
    res.json({ message: 'Defendant updated successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteDefendant = async (req, res) => {
  const defendant_id = req.params.id;
  if (!defendant_id || isNaN(Number(defendant_id))) {
    return res.status(400).json({ error: 'Defendant ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Defendant WHERE defendant_id = ?', [defendant_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Defendant not found.' });
    res.json({ message: 'Defendant deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== CASE OPERATIONS ==================
export const createCase = async (req, res) => {
  try {
    const { case_number, case_type, status, court_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO CaseDetails (case_number, case_type, status, court_id) VALUES (?, ?, ?, ?)',
      [case_number, case_type, status, court_id]
    );
    res.status(201).json({ case_id: result.insertId, case_number, case_type, status, court_id });
  } catch (err) { handleDbError(res, err); }
};

export const getAllCases = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM CaseDetails');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getCaseById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM CaseDetails WHERE case_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Case not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateCase = async (req, res) => {
  const { case_number, case_type, status, court_id } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE CaseDetails SET case_number = ?, case_type = ?, status = ?, court_id = ? WHERE case_id = ?',
      [case_number, case_type, status, court_id, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Case updated successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteCase = async (req, res) => {
  const case_id = req.params.id;
  if (!case_id || isNaN(Number(case_id))) {
    return res.status(400).json({ error: 'Case ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM CaseDetails WHERE case_id = ?', [case_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Case not found.' });
    res.json({ message: 'Case deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== CASE PARTY ==================
export const createParty = async (req, res) => {
  const { case_id, party_type, plaintiff_id, defendant_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Case_Party (case_id, party_type, plaintiff_id, defendant_id) VALUES (?, ?, ?, ?)',
      [case_id, party_type, plaintiff_id, defendant_id]
    );
    res.status(201).json({ party_id: result.insertId, case_id, party_type, plaintiff_id, defendant_id });
  } catch (err) { handleDbError(res, err); }
};

export const getAllParties = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Case_Party');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getPartyById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Case_Party WHERE party_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Party not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateParty = async (req, res) => {
  const { case_id, party_type, plaintiff_id, defendant_id } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Case_Party SET case_id = ?, party_type = ?, plaintiff_id = ?, defendant_id = ? WHERE party_id = ?',
      [case_id, party_type, plaintiff_id, defendant_id, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Party not found' });
    res.json({ message: 'Party updated successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteParty = async (req, res) => {
  const party_id = req.params.id;
  if (!party_id || isNaN(Number(party_id))) {
    return res.status(400).json({ error: 'Party ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Case_Party WHERE party_id = ?', [party_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Party not found.' });
    res.json({ message: 'Party deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== VERDICT OPERATIONS ==================
export const createVerdict = async (req, res) => {
  try {
    const { case_id, judge_id, decision } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Verdict (case_id, judge_id, decision) VALUES (?, ?, ?)',
      [case_id, judge_id, decision]
    );
    res.status(201).json({ verdict_id: result.insertId, case_id, judge_id, decision });
  } catch (err) { handleDbError(res, err); }
};

export const getAllVerdicts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Verdict');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getVerdictById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Verdict WHERE verdict_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Verdict not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateVerdict = async (req, res) => {
  const { case_id, judge_id, decision } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Verdict SET case_id = ?, judge_id = ?, decision = ? WHERE verdict_id = ?',
      [case_id, judge_id, decision, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Verdict not found' });
    res.json({ message: 'Verdict updated successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteVerdict = async (req, res) => {
  const verdict_id = req.params.id;
  if (!verdict_id || isNaN(Number(verdict_id))) {
    return res.status(400).json({ error: 'Verdict ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Verdict WHERE verdict_id = ?', [verdict_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Verdict not found.' });
    res.json({ message: 'Verdict deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== CASE LAWYER ==================
export const createCaseLawyer = async (req, res) => {
  const { case_id, lawyer_id, role } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Case_Lawyer (case_id, lawyer_id, role) VALUES (?, ?, ?)',
      [case_id, lawyer_id, role]
    );
    res.status(201).json({ case_lawyer_id: result.insertId, case_id, lawyer_id, role });
  } catch (err) { handleDbError(res, err); }
};

export const getAllCaseLawyers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Case_Lawyer');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getCaseLawyerById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Case_Lawyer WHERE case_lawyer_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Case Lawyer not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateCaseLawyer = async (req, res) => {
  const { case_id, lawyer_id, role } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Case_Lawyer SET case_id = ?, lawyer_id = ?, role = ? WHERE case_lawyer_id = ?',
      [case_id, lawyer_id, role, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Case Lawyer not found' });
    res.json({ message: 'Case Lawyer entry updated successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteCaseLawyer = async (req, res) => {
  const case_lawyer_id = req.params.id;
  if (!case_lawyer_id || isNaN(Number(case_lawyer_id))) {
    return res.status(400).json({ error: 'Case Lawyer ID is required and must be a number.' });
  }
  try {
    const [result] = await pool.query('DELETE FROM Case_Lawyer WHERE case_lawyer_id = ?', [case_lawyer_id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Case Lawyer not found.' });
    res.json({ message: 'Case Lawyer entry deleted successfully.' });
  } catch (err) { handleDbError(res, err); }
};

// ================== MASTER TABLE ==================
export const createMasterEntry = async (req, res) => {
  try {
    const {
      court_id, judge_id, lawyer_id, case_id,
      plaintiff_id, defendant_id, party_id, verdict_id, case_lawyer_id
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO MasterTable (
        court_id, judge_id, lawyer_id, case_id,
        plaintiff_id, defendant_id, party_id, verdict_id, case_lawyer_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        court_id || null, judge_id || null, lawyer_id || null, case_id || null,
        plaintiff_id || null, defendant_id || null, party_id || null, verdict_id || null, case_lawyer_id || null
      ]
    );
    res.json({ master_id: result.insertId, message: 'MasterTable entry created successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const getAllMasterEntries = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM MasterTable');
    res.json(rows);
  } catch (err) { handleDbError(res, err); }
};

export const getMasterEntryById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM MasterTable WHERE master_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Master entry not found' });
    res.json(rows[0]);
  } catch (err) { handleDbError(res, err); }
};

export const updateMasterEntry = async (req, res) => {
  try {
    const {
      court_id, judge_id, lawyer_id, case_id,
      plaintiff_id, defendant_id, party_id, verdict_id, case_lawyer_id
    } = req.body;

    const [result] = await pool.query(
      `UPDATE MasterTable
       SET court_id = ?, judge_id = ?, lawyer_id = ?, case_id = ?,
           plaintiff_id = ?, defendant_id = ?, party_id = ?, verdict_id = ?, case_lawyer_id = ?
       WHERE master_id = ?`,
      [
        court_id || null, judge_id || null, lawyer_id || null, case_id || null,
        plaintiff_id || null, defendant_id || null, party_id || null, verdict_id || null, case_lawyer_id || null,
        req.params.id
      ]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Master entry not found' });
    res.json({ message: 'MasterTable entry updated successfully' });
  } catch (err) { handleDbError(res, err); }
};

export const deleteMasterEntry = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM MasterTable WHERE master_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'MasterTable entry not found' });
    res.json({ message: 'MasterTable entry deleted successfully' });
  } catch (err) { handleDbError(res, err); }
};
