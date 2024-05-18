import express from "express";
import { createList, addUsers, sendEmail } from "../controllers/controllers.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post("/lists", createList);
router.post("/lists/:listId/users", upload.single('file'), addUsers);
router.post("/lists/:listId/email", sendEmail);

export default router;