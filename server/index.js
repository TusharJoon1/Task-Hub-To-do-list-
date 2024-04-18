const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const UserModel = require('./models/User');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/authentication');

// Middleware to verify JWT token
const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], "jwt-secret-key");
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error("Error verifying token:", err);
        res.status(403).json({ error: "Forbidden" });
    }
};

// Get endpoint to retrieve protected data
app.get('/list', verifyUser, (req, res) => {
    // This route is protected by JWT verification
    res.json({ message: "Authenticated" });
});

// POST endpoint to send email
app.post('/list', (req, res) => {
    const { email } = req.body;
    console.log(email);
    // Perform email sending logic here
    res.json({ message: 'Email sent successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        // Generate JWT token
                        const token = jwt.sign({ user }, "jwt-secret-key", { expiresIn: "1d" });
                        // Send the token in HTTP headers
                        res.header("Authorization", `Bearer ${token}`);
                        res.json("Success");
                    } else {
                        res.json("Password Wrong");
                    }
                });
            } else {
                res.json("User not Found");
            }
        })
        .catch(err => {
            console.error("Error in login:", err);
            res.status(500).json({ error: 'An error occurred during login.' });
        });
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password, cpassword } = req.body;

    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash, cpassword: hash })
                .then(authentication => {
                    console.log("User signed up successfully:", authentication);
                    res.json(authentication);
                })
                .catch(err => {
                    console.error("Error creating user:", err);
                    res.status(500).json({ error: 'An error occurred during signup.' });
                });
        })
        .catch(err => {
            console.error("Error hashing password:", err);
            res.status(500).json({ error: 'An error occurred during password hashing.' });
        });
});

var PORT = process.env.PORT || 3000; // Default port is 3000 if PORT is not specified in .env

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
