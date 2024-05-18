import express from 'express';
import { uploadUsers, sendEmail, unsubscribeUser } from "../controllers/userController.js";
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/lists/:listId/users', upload.single('file'), uploadUsers);
router.post('/lists/:listId/send-email', sendEmail);
router.get('/unsubscribe/:userId', unsubscribeUser);

export default router;