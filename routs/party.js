import express from 'express';
import {
createParty,
getPartyById,
getAllParties,
updateParty,
deleteParty
} from '../controllers/control.js';

const router = express.Router();
router.post('/',createParty);
router.get('/', getAllParties);
router.get('/:id', getPartyById);
router.put('/:id', updateParty);
router.delete('/:id', deleteParty);

export default router;
