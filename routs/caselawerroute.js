import express from 'express';
import {
  createCaseLawyer,
  getAllCaseLawyers,
  getCaseLawyerById, 
  updateCaseLawyer,
  deleteCaseLawyer
} from '../controllers/control.js';

const router = express.Router();

router.post('/', createCaseLawyer);
router.get('/', getAllCaseLawyers);
router.get('/:id', getCaseLawyerById); 
router.put('/:id', updateCaseLawyer);
router.delete('/:id', deleteCaseLawyer);

export default router;
