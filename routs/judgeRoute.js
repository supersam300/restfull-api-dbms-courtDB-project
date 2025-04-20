import express from 'express';
import {
  createJudge,
  getJudges,
  getJudgebyID, 
  updateJudge,
  deleteJudge
} from '../controllers/control.js';

const router = express.Router();

router.post('/', createJudge);
router.get('/', getJudges);
router.get('/:id', getJudgebyID); 
router.put('/:id', updateJudge);
router.delete('/:id', deleteJudge);

export default router;
