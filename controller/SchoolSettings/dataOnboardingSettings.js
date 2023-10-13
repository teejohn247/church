
import dotenv from 'dotenv';
import Roles from '../../model/Roles';
import School from '../../model/School';




dotenv.config();


const dataOnboardingSettings = async (req, res) => {


        try {

            const {       
            bulk_upload
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
                    "data_onboarding_settings.bulk_uplaod":  bulk_upload &&  bulk_upload,
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
                        data: "Data Onboarding Settings Updated"
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
export default dataOnboardingSettings;
