import express from "express";
import { createList } from "../controllers/listController.js";

const router = express.Router();

router.post('/lists', createList);

export default router;