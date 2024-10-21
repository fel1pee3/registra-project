import express from "express"
import bcrypt from "bcrypt"

import { connectToDatabase } from "../lib/db.js";

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, telephone, email, password} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length > 0) {
            return res.status(409).json({message : "user already existed"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO users (username, telephone, email, password) VALUES (?, ?, ?, ?)", [username, telephone, email, hashPassword])

        res.status(201).json({message: "user creates successfully"})
    } catch(err) {
        console.error("Database error: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export default router;