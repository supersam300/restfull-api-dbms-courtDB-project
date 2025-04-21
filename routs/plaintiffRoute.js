import express from 'express';
import {
  createPlaintiff,
  getPlaintiffs,
  getPlaintiffById, 
  updatePlaintiff,
  deletePlaintiff
} from '../controllers/control.js';

const router = express.Router();

router.post('/', createPlaintiff);
router.get('/',getPlaintiffs);
router.get('/:id', getPlaintiffById); 
router.put('/:id', updatePlaintiff);
router.delete('/:id', deletePlaintiff);

export default router;
