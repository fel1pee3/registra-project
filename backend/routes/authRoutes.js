import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if(rows.length === 0) {
            return res.status(404).json({message : "user not existed"})
        }

        const isMatch = await bcrypt.compare(password, rows[0].password)
        if(!isMatch) {
            return res.status(401).json({message : "Wrong password"})
        }

        const token = jwt.sign({id: rows[0].id}, "jwt-secret-key", {expiresIn: '3h'})

        res.status(201).json({token: token})
    } catch(err) {
        console.error("Database error: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

const verifyToken = async (req, res, next) => {
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token) {
            return res.status(403).json({message: "No token provided"})
        }
        const decoded = jwt.verify(token, "jwt-secret-key")
        req.userId = decoded.id;
        next()
    } catch(err) {
        return res.status(500).json({message: "Serve error"})
    }
}

router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId])
        if(rows.length > 0) {
            return res.status(409).json({message : "user already existed"})
        }

        return res.status(201).json({user: rows[0]})
    } catch (err) {
        return res.status(500).json({message: "server error"})
    }
})

export default router;