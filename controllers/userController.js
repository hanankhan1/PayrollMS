const model = require("../models/userModel");

exports.getUsers = (req, res) => {
    model.getUsers((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.getEmployeesWithoutUser = (req, res) => {
    model.getEmployeesWithoutUser((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.createUser = async (req, res) => {
    const { username, password, role, employee_id } = req.body;

    model.createUser(
        { username, password, role },
        (err, result) => {
            if (err) return res.status(500).json(err);
            const userId = result.insertId;
            model.linkEmployee(userId, employee_id, (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "User Created Successfully" });
            });
        }
    );
};

exports.deleteUser = (req, res) => {
    model.deleteUser(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User Deleted" });
    });
};
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { username, password, role } = req.body;

    // Validate all fields are present
    if (!username || !password || !role) {
        return res.status(400).json({ message: "All fields (username, password, role) are required" });
    }

    model.updateUser(userId, { username, password, role }, (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            return res.status(500).json({ message: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully" });
    });
};