const model =
require("../models/salaryStructureModel");

exports.getAll = (req,res)=>{

    model.getAll(
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);
        }
    );
};

exports.add = (req,res)=>{

    model.add(
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                message:
                "Salary Structure Added"
            });
        }
    );
};

exports.update = (req,res)=>{

    model.update(
        req.params.id,
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                message:
                "Salary Structure Updated"
            });
        }
    );
};

exports.delete = (req,res)=>{

    model.delete(
        req.params.id,
        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                message:
                "Salary Structure Deleted"
            });
        }
    );
};