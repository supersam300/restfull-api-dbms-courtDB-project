import express from 'express';
import
{
    createDefendant,
    getDefendants,
    getDefendantById,
    deleteDefendant,
    updateDefendant
} from '../controllers/control.js'

const router = express.Router()

router.post('/', createDefendant);
router.get('/', getDefendants);
router.get('/:id', getDefendantById); 
router.put('/:id', updateDefendant);
router.delete('/:id', deleteDefendant);

export default router;