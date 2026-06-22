const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

exports.register = (req, res) => {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    authModel.findUserByUsername(username, (err, result) => {
        if (err) {
            console.error("DB error in register:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
            return res.status(400).json({ message: "Username Already Exists" });
        }

        // Store plaintext password (no hashing – for dev only)
        authModel.createUser(
            { username, password, role },
            (err) => {
                if (err) {
                    console.error("DB error creating user:", err);
                    return res.status(500).json({ message: "Failed to create user" });
                }
                res.status(201).json({ message: "User Registered Successfully" });
            }
        );
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    console.log("Login attempt - username:", username);
    console.log("Login attempt - password:", password);

    authModel.findUserByUsername(username, (err, result) => {
        if (err) {
            console.error("DB error in login:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const user = result[0];
        console.log("Stored password from DB:", user.password);
        console.log("Comparison result:", password === user.password);

        // ❗ If stored password has trailing spaces, this will fail
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            token,
            user_id: user.user_id,
            employee_id: user.employee_id,
            full_name: user.full_name,
            username: user.username,
            role: user.role
        });
    });
};