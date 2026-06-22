const model =
require("../models/dashboardModel");

exports.adminStats =
(req,res)=>{

    model.getAdminStats(
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result[0]);
        }
    );
};

exports.hrStats =
(req,res)=>{

    model.getHRStats(
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result[0]);
        }
    );
};

exports.payrollStats =
(req,res)=>{

    model.getPayrollStats(
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result[0]);
        }
    );
};

exports.employeeStats =
(req,res)=>{

    model.getEmployeeStats(
        req.params.employeeId,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result[0]);
        }
    );
};