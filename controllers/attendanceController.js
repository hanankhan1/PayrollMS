const model =
require("../models/attendanceModel");

exports.getAttendance = (
    req,
    res
) => {

    model.getAttendance(
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};

exports.addAttendance = (
    req,
    res
) => {

    model.addAttendance(
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Attendance Recorded"
            });
        }
    );
};

exports.updateAttendance = (
    req,
    res
) => {

    model.updateAttendance(
        req.params.id,
        req.body,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Attendance Updated"
            });
        }
    );
};

exports.deleteAttendance = (
    req,
    res
) => {

    model.deleteAttendance(
        req.params.id,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json({
                message:
                "Attendance Deleted"
            });
        }
    );
};