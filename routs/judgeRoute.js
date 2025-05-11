import express from 'express';
import {
  createJudge,
  getJudges,
  getJudgeById, 
  updateJudge,
  deleteJudge
} from '../controllers/control.js';


const router = express.Router();

router.post('/', createJudge);
router.get('/', getJudges);
router.get('/:id', getJudgeById);
router.put('/:id', updateJudge);
router.delete('/:id', deleteJudge);

export default router;
