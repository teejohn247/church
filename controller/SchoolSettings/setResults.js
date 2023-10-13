
import dotenv from 'dotenv';
import Roles from '../../model/Roles';
import School from '../../model/School';




dotenv.config();


const setResults = async (req, res) => {

    try {

        const {   
            create_assessment_type,
            create_assessment_categories,
            create_grading_system,
            create_score_columns,
            setup_comments_columns
        } = req.body;
        const { school_id } = req.params;



        const school = await School.find({_id: school_id})

        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School does not exist'
            })
            return;
        }


        School.findOneAndUpdate({ _id: school_id },
        {
            $set:
            {
                "results_settings.create_assessment_type": create_assessment_type && create_assessment_type,
                "results_settings.create_assessment_categories":create_assessment_categories && create_assessment_categories,
                "results_settings.create_grading_system": create_grading_system && create_grading_system,
                "results_settings.create_score_columns": create_score_columns && create_score_columns,
                "results_settings.setup_comments_columns": setup_comments_columns && setup_comments_columns

            }
        },
          // { upsert: true, new: true },
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
                return;
            }
            else {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: "Results Settings Updated"
                })

            }

        }
        )

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default setResults;
