const model =
require("../models/departmentModel");

exports.getDepartments = (
    req,
    res
) => {

    model.getAllDepartments(
        (err, result) => {

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};

exports.addDepartment = (
    req,
    res
) => {

    model.addDepartment(
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Department Added Successfully"
            });
        }
    );
};

exports.updateDepartment = (
    req,
    res
) => {

    model.updateDepartment(
        req.params.id,
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Department Updated Successfully"
            });
        }
    );
};

exports.deleteDepartment = (
    req,
    res
) => {

    model.deleteDepartment(
        req.params.id,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Department Deleted Successfully"
            });
        }
    );
};

exports.searchDepartment = (
    req,
    res
) => {

    model.searchDepartment(
        req.params.keyword,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};