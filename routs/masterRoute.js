import express from 'express';
import {
  createMasterEntry,
  getAllMasterEntries,
  getMasterEntryById,
  updateMasterEntry,
  deleteMasterEntry,
} from '../controllers/control.js';

const router = express.Router();
router.post('/', createMasterEntry);

router.get('/', getAllMasterEntries);

router.get('/:id', getMasterEntryById);

router.put('/:id', updateMasterEntry);


router.delete('/:id', deleteMasterEntry);

export default router;