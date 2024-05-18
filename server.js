import express from 'express';
import dotenv from "dotenv";
import listRoutes from "./src/routes/listRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import connectDB from './src/config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('public'));

// rest api
app.use("/api", listRoutes);
app.use("/api", userRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});