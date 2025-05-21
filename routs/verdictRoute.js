import express from 'express';
import {
  createVerdict,
  getAllVerdicts,
  getVerdictById,
  updateVerdict,
  deleteVerdict,
  countVerdicts
} from '../controllers/control.js';

const router = express.Router();

router.post('/', createVerdict);
router.get('/', getAllVerdicts);
router.get('/count', countVerdicts);
router.get('/:id', getVerdictById);
router.put('/:id', updateVerdict);
router.delete('/:id', deleteVerdict);

export default router;
