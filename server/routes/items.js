import express from 'express';
import { addItems, getItems } from '../controllers/items.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', addItems);

export default router;