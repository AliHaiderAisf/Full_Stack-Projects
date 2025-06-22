import express from 'express';
import { getStats, getStat, createStat, updateStat, deleteStat } from '../controllers/statController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all routes in this router

router.get('/', getStats);
router.get('/:id', getStat);
router.post('/', createStat);
router.put('/:id', updateStat);
router.delete('/:id', deleteStat);

export default router;