import express from 'express';
import {
  createJudge,
  getJudges,
  getJudgeById,
  updateJudge,
  deleteJudge,
  getCourtsForJudge,
  getJudgesForCourt,
  countJudges
} from '../controllers/control.js';

const router = express.Router();

router.post('/', createJudge);
router.get('/', getJudges);
router.get('/count', countJudges);
router.get('/:id', getJudgeById);
router.put('/:id', updateJudge);
router.delete('/:id', deleteJudge);

// Many-to-many: judge-court

router.get('/:judgeId/courts', getCourtsForJudge);
router.get('/court/:courtId', getJudgesForCourt);

export default router;
