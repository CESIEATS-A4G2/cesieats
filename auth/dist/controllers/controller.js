"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const User_DB = [];
const register = (req, res) => {
    const hashedPassword = bcrypt_1.default.hashSync(req.body.password, 10);
    const newUser = new user_model_1.default(req.body.username, hashedPassword);
    User_DB.push(newUser);
    res.status(201).json({
        msg: 'New User created !',
    });
};
exports.register = register;
const login = (req, res) => {
    const { username, password } = req.body;
    const user = User_DB.find((u) => u.username === username && bcrypt_1.default.compareSync(password, u.password));
    if (user) {
        const token = jsonwebtoken_1.default.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + 120 }, process.env.JWT_SECRET);
        res
            .cookie('token', token, {
            httpOnly: true,
            secure: false, // needs to be true if HTTPS 
            sameSite: 'lax',
            maxAge: 2 * 60 * 1000 // 2 min
        })
            .status(200)
            .json({ message: 'You are now connected !' });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.login = login;
const authenticate = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).json({ message: 'No token provided in cookie.' });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Invalid or expired token.' });
            return;
        }
        const user = User_DB.find((u) => u.username === decoded.username);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json({
            message: 'User authenticated',
            user: user.username
        });
    });
};
exports.authenticate = authenticate;
