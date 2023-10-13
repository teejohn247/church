
import dotenv from 'dotenv';
import School from '../../model/School';

dotenv.config();


const deleteSchool = async (req, res) => {

    try {


        let school = await School.findOne({ _id: req.params.id});


        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School not found'
            })
            return;
        }

        School.remove({ _id: req.params.id },
            function (
                err,
                result
            ) {

                console.log(result)

                if (err) {
                    res.status(401).json({
                        status: 401,
                        success: false,
                        error: err
                    })
                }
                else {
                    res.status(200).json({
                        status: 200,
                        success: true,
                        data: "School Deleted successfully!"
                    })
                }

            })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default deleteSchool;
