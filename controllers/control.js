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
    console.log("Incoming judge data:", { name, experience_years, court_id }); // Debug log
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
    console.error("Error inserting judge:", err); // See this in your terminal
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


// CREATE Lawyer
export const createLawyer = async (req, res) => {
  const { lawyer_id, name, specialization, experience_years } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Lawyer (lawyer_id, name, specialization, experience_years) VALUES (?, ?, ?, ?)',
      [lawyer_id, name, specialization, experience_years]
    );
    res.status(201).json({
      lawyer_id,
      name,
      specialization,
      experience_years
    });
  } catch (err) {
    console.error('Error creating lawyer:', err); // helpful for logs
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

/* its like 9pm rn and i got like 4 more tables to go. every time i look at my schema i feel sad :( BUT the api is working soo yay
although making the frontend is gonna be a pain *w* but its not my problem :p, GOOD LUCK TEAM */

// 1. get PLAINTIFF
export const getPlaintiffs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Plaintiff');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get a single plaintiff by ID
export const getPlaintiffById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Plaintiff WHERE plaintiff_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Plaintiff not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Create a new plaintiff
export const createPlaintiff = async (req, res) => {
  const { plaintiff_id, name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Plaintiff (plaintiff_id, name, address, contact_number) VALUES (?, ?, ?, ?)',
      [plaintiff_id, name, address, contact_number]
    );
    res.status(201).json({ message: 'Plaintiff created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Update a plaintiff
export const updatePlaintiff = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Plaintiff SET name = ?, address = ?, contact_number = ? WHERE plaintiff_id = ?',
      [name, address, contact_number, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Plaintiff not found' });
    }
    res.json({ message: 'Plaintiff updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Delete a plaintiff
export const deletePlaintiff = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Plaintiff WHERE plaintiff_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Plaintiff not found' });
    }
    res.json({ message: 'Plaintiff deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 1. Get all defendants
export const getDefendants = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Defendant');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get a defendant by ID
export const getDefendantById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Defendant WHERE defendant_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Defendant not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Create a new defendant
export const createDefendant = async (req, res) => {
  const { defendant_id, name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Defendant (defendant_id, name, address, contact_number) VALUES (?, ?, ?, ?)',
      [defendant_id, name, address, contact_number]
    );
    res.status(201).json({ message: 'Defendant created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Update a defendant
export const updateDefendant = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Defendant SET name = ?, address = ?, contact_number = ? WHERE defendant_id = ?',
      [name, address, contact_number, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Defendant not found' });
    }
    res.json({ message: 'Defendant updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Delete a defendant
export const deleteDefendant = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Defendant WHERE defendant_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Defendant not found' });
    }
    res.json({ message: 'Defendant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Create Case
export const createCase = async (req, res) => {
  try {
    const { case_id, case_number, case_type, filing_date, status, court_id, judge_id } = req.body;
    const query = `INSERT INTO CaseDetails (case_id, case_number, case_type, filing_date, status, court_id, judge_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await db.query(query, [case_id, case_number, case_type, filing_date, status, court_id, judge_id]);
    res.json({ message: 'Case created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Cases
export const getAllCases = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM CaseDetails');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Case by ID
export const getCaseById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM CaseDetails WHERE case_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Case not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Case
export const updateCase = async (req, res) => {
  try {
    const { case_number, case_type, filing_date, status, court_id, judge_id } = req.body;
    const query = `UPDATE CaseDetails 
                   SET case_number = ?, case_type = ?, filing_date = ?, status = ?, court_id = ?, judge_id = ? 
                   WHERE case_id = ?`;
    await db.query(query, [case_number, case_type, filing_date, status, court_id, judge_id, req.params.id]);
    res.json({ message: 'Case updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Case
export const deleteCase = async (req, res) => {
  try {
    await db.query('DELETE FROM CaseDetails WHERE case_id = ?', [req.params.id]);
    res.json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*if you made it this far, i too am wondering why i did not make a seperate file for each controller. 
i could make a seperate file but i am too deep into the code, i cannot bother to even try at this point XwX */

// Create Party
export const createParty = async (req, res) => {
  try {
    const { party_id, case_id, party_type, plaintiff_id, defendant_id } = req.body;
    const query = `INSERT INTO Case_Party (party_id, case_id, party_type, plaintiff_id, defendant_id) 
                   VALUES (?, ?, ?, ?, ?)`;
    await db.query(query, [party_id, case_id, party_type, plaintiff_id, defendant_id]);
    res.json({ message: 'Case party added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Parties
export const getAllParties = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Case_Party');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Party by ID
export const getPartyById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Case_Party WHERE party_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Party not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Party
export const updateParty = async (req, res) => {
  try {
    const { case_id, party_type, plaintiff_id, defendant_id } = req.body;
    const query = `UPDATE Case_Party 
                   SET case_id = ?, party_type = ?, plaintiff_id = ?, defendant_id = ? 
                   WHERE party_id = ?`;
    await db.query(query, [case_id, party_type, plaintiff_id, defendant_id, req.params.id]);
    res.json({ message: 'Party updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Party
export const deleteParty = async (req, res) => {
  try {
    await db.query('DELETE FROM Case_Party WHERE party_id = ?', [req.params.id]);
    res.json({ message: 'Party deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Verdict
export const createVerdict = async (req, res) => {
  try {
    const { verdict_id, case_id, judge_id, verdict_date, decision } = req.body;
    const query = `INSERT INTO Verdict (verdict_id, case_id, judge_id, verdict_date, decision) 
                   VALUES (?, ?, ?, ?, ?)`;
    await db.query(query, [verdict_id, case_id, judge_id, verdict_date, decision]);
    res.json({ message: 'Verdict added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Verdicts
export const getAllVerdicts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Verdict');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Verdict by ID
export const getVerdictById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Verdict WHERE verdict_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Verdict not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Verdict
export const updateVerdict = async (req, res) => {
  try {
    const { case_id, judge_id, verdict_date, decision } = req.body;
    const query = `UPDATE Verdict 
                   SET case_id = ?, judge_id = ?, verdict_date = ?, decision = ? 
                   WHERE verdict_id = ?`;
    await db.query(query, [case_id, judge_id, verdict_date, decision, req.params.id]);
    res.json({ message: 'Verdict updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Verdict
export const deleteVerdict = async (req, res) => {
  try {
    await db.query('DELETE FROM Verdict WHERE verdict_id = ?', [req.params.id]);
    res.json({ message: 'Verdict deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Case_Lawyer
export const createCaseLawyer = async (req, res) => {
  try {
    const { case_lawyer_id, case_id, lawyer_id, role } = req.body;
    const query = `INSERT INTO Case_Lawyer (case_lawyer_id, case_id, lawyer_id, role)
                   VALUES (?, ?, ?, ?)`;
    await db.query(query, [case_lawyer_id, case_id, lawyer_id, role]);
    res.json({ message: 'Case_Lawyer entry created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Case_Lawyers
export const getAllCaseLawyers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Case_Lawyer');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Case_Lawyer by ID
export const getCaseLawyerById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Case_Lawyer WHERE case_lawyer_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Case_Lawyer not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Case_Lawyer
export const updateCaseLawyer = async (req, res) => {
  try {
    const { case_id, lawyer_id, role } = req.body;
    const query = `UPDATE Case_Lawyer 
                   SET case_id = ?, lawyer_id = ?, role = ? 
                   WHERE case_lawyer_id = ?`;
    await db.query(query, [case_id, lawyer_id, role, req.params.id]);
    res.json({ message: 'Case_Lawyer entry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Case_Lawyer
export const deleteCaseLawyer = async (req, res) => {
  try {
    await db.query('DELETE FROM Case_Lawyer WHERE case_lawyer_id = ?', [req.params.id]);
    res.json({ message: 'Case_Lawyer entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* i just realised how painfull navigating through this might be, i hope i dont get any problems. i havent tested this yet and i swear if i 
have to debug this i am going to cry ;-: */

// Create MasterTable Entry
export const createMasterEntry = async (req, res) => {
  try {
    const {
      court_id,
      judge_id,
      lawyer_id,
      case_id,
      plaintiff_id,
      defendant_id,
      party_id,
      verdict_id,
      case_lawyer_id,
    } = req.body;

    const query = `
      INSERT INTO MasterTable (
        court_id, judge_id, lawyer_id, case_id,
        plaintiff_id, defendant_id, party_id, verdict_id, case_lawyer_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.query(query, [
      court_id || null,
      judge_id || null,
      lawyer_id || null,
      case_id || null,
      plaintiff_id || null,
      defendant_id || null,
      party_id || null,
      verdict_id || null,
      case_lawyer_id || null,
    ]);

    res.json({ message: 'MasterTable entry created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All MasterTable Entries
export const getAllMasterEntries = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM MasterTable');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get MasterTable Entry by ID
export const getMasterEntryById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM MasterTable WHERE master_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Master entry not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update MasterTable Entry
export const updateMasterEntry = async (req, res) => {
  try {
    const {
      court_id,
      judge_id,
      lawyer_id,
      case_id,
      plaintiff_id,
      defendant_id,
      party_id,
      verdict_id,
      case_lawyer_id,
    } = req.body;

    const query = `
      UPDATE MasterTable
      SET court_id = ?, judge_id = ?, lawyer_id = ?, case_id = ?,
          plaintiff_id = ?, defendant_id = ?, party_id = ?, verdict_id = ?, case_lawyer_id = ?
      WHERE master_id = ?
    `;

    await db.query(query, [
      court_id || null,
      judge_id || null,
      lawyer_id || null,
      case_id || null,
      plaintiff_id || null,
      defendant_id || null,
      party_id || null,
      verdict_id || null,
      case_lawyer_id || null,
      req.params.id,
    ]);

    res.json({ message: 'MasterTable entry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete MasterTable Entry
export const deleteMasterEntry = async (req, res) => {
  try {
    await db.query('DELETE FROM MasterTable WHERE master_id = ?', [req.params.id]);
    res.json({ message: 'MasterTable entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 //DONE !!, i will route them tommorow. the bed looks really comfy rn zzzzzzzzz......