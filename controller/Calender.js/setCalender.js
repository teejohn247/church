
import dotenv from 'dotenv';
import School from '../../model/School';

dotenv.config();

const setCalender = async (req, res) => {

    try {


        const {
            create_calender,
            edit_calender_events,
            download_calender,
            share_calender,
            delete_calender,
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
                "calenders_settings.create_calender": create_calender && create_calender,
                "calenders_settings.edit_calender_events": edit_calender_events && edit_calender_events,
                "calenders_settings.download_calender": download_calender && download_calender,
                "calenders_settings.share_calender": share_calender && share_calender,
                "calenders_settings.delete_calender": delete_calender && delete_calender
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
                        data: "Calender Configured Successfully"
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
export default setCalender;
