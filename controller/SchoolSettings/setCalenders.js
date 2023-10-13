
import dotenv from 'dotenv';
import Roles from '../../model/Roles';
import School from '../../model/School';




dotenv.config();


const setCalenders = async (req, res) => {

    try {



        const {   
        create_calender,
        edit_calender_events,
        download_calender,
        share_calender,
        delete_calender
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
                "calenders_settings.create_calender": create_calender && create_calender,
                "calenders_settings.edit_calender_events":edit_calender_events && edit_calender_events,
                "calenders_settings.download_calender": download_calender && download_calender,
                "calenders_settings.share_calender": share_calender && share_calender ,
                "calenders_settings.delete_calender": delete_calender && delete_calender

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
                    data: "Calender Settings Updated"
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
export default setCalenders;
