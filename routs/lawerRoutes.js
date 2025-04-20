import express from 'express';
import {
  createLawyer,
  getLawyers,
  getLawyerById,
  updateLawyer,
  deleteLawyer
} from '../controllers/control.js';

const router = express.Router();

router.post('/', createLawyer);
router.get('/', getLawyers);
router.get('/:id', getLawyerById);
router.put('/:id', updateLawyer);
router.delete('/:id', deleteLawyer);

export { router };