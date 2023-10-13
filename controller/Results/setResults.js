
import dotenv from 'dotenv';
import School from '../../model/School';

dotenv.config();

const setResult = async (req, res) => {

    try {
        const {
            create_assessment_type,
            create_assessment_categories,
            create_grading_system,
            create_score_columns,
            setup_comments_columns,
            schools
        } = req.body;

        let ids = [];

        schools.map((sch, index) => {
            console.log(sch.id)
            ids.push(sch.id)
        })

        const school = await School.find({ _id: { $in: ids } });

        if (!school) {
            res.status(404).json({
                status: 404,
                error: 'One or more schools does not exist'
            })
            return
        }

        School.update({ _id: { $in: ids } }, {
            $set:
            {
                "results_settings.create_assessment_type": create_assessment_type && create_assessment_type,
                "results_settings.create_assessment_categories":create_assessment_categories && create_assessment_categories,
                "results_settings.create_grading_system": create_grading_system && create_grading_system,
                "results_settings.create_score_columns": create_score_columns && create_score_columns,
                "results_settings.setup_comments_columns": setup_comments_columns && setup_comments_columns
            }

        },
            { multi: true },
            function (
                err,
                result
            ) {
                if (err) {

                    res.status(401).json({
                        status: 401,
                        success: false,
                        error: err

                    })

                } else {



                    res.status(200).json({
                        status: 200,
                        success: true,
                        data: "Result Configured Successfully"
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
export default setResult;
