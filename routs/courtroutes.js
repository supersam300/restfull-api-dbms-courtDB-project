import express from 'express'; // express is nothing but our database
import {
  createCourt,
  getCourts,
  getCourtById,
  updateCourt,
  deleteCourt
} from '../controllers/control.js'; //calling the operations from our controller

const router = express.Router();

router.post('/', createCourt);
router.get('/', getCourts);
router.get('/:id', getCourtById); //btw the /:id means its a dynamic value, do not get too confused :)
router.put('/:id', updateCourt);
router.delete('/:id', deleteCourt);

export default router;
