import express from 'express';
import multer from 'multer';
import { createRequest, getAllRequests, addResponse } from '../controllers/requestController.js';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
const router = express.Router();
router.get('/', getAllRequests);
router.post('/', upload.single('image'), createRequest);
router.post('/:id/respond', addResponse);
export default router;
