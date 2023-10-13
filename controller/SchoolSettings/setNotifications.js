
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Roles from '../../model/Roles';
import School from '../../model/School';




dotenv.config();


const setNotifications = async (req, res) => {

    try {

        const {
            notification_types,
            notification_targets,
            notification_channels

        } = req.body;
        const { school_id } = req.params;


        const school = await School.find({ _id: school_id })

        if (!school) {
            res.status(400).json({
                status: 400,
                error: 'School does not exist'
            })
            return;



        }

        let arrayFilters = [];
        let set = {};

        notification_types.forEach((v, i) => {
            arrayFilters.push({ [`p${i}._id`]: v._id });
            set[`notification_types.$[p${i}].enabled`] = v.enabled;
        });


        School.updateMany(
            { _id: school_id },
            { $set: set },
            { arrayFilters: arrayFilters },
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
                    School.update({ _id: school_id },
                        {
                            $set:
                            {
                                "notifications_settings.notification_targets": notification_targets,
                                "notifications_settings.notification_channels": notification_channels,
                            },
                        },
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
                            return res.status(200).json({
                                status: 200,
                                success: true,
                                data: "Notification settings Updated"
                            })


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
export default setNotifications;
