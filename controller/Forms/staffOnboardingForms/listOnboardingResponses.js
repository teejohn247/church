
import dotenv from 'dotenv';
import Forms from '../../../model/OnboardingData';



dotenv.config();


const listOnboardingResponses = async (req, res) => {

    try {

        const form = await Forms.find()

        if (!form) {
            res.status(400).json({
                status: 400,
                error: 'Form does not exist'
            })
            return;
        }
       
        res.status(200).json({
            status: 200,
            success: true,
            data: form
        })

    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}
export default listOnboardingResponses;
