const model =
require("../models/employeeModel");

// Get Employees
exports.getEmployees = (
    req,
    res
) => {

    model.getAllEmployees(
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};

// Add Employee
exports.addEmployee = (
    req,
    res
) => {

    model.addEmployee(
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Employee Added Successfully"
            });
        }
    );
};

// Update Employee
exports.updateEmployee = (
    req,
    res
) => {

    model.updateEmployee(
        req.params.id,
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Employee Updated Successfully"
            });
        }
    );
};

// Delete Employee
exports.deleteEmployee = (
    req,
    res
) => {

    model.deleteEmployee(
        req.params.id,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Employee Deleted Successfully"
            });
        }
    );
};

// Search Employee
exports.searchEmployee = (
    req,
    res
) => {

    model.searchEmployee(
        req.params.keyword,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};