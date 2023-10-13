
import dotenv from 'dotenv';
import DemoRequest from '../../model/DemoRequests';

dotenv.config();


const demoRequest = async (req, res) => {

    try {
       
        const { schoolName, contactPerson, contactEmail, contactLocation,AreaOfInterest,contactPhoneNumber, schoolRole,HowDidYouHear} = req.body;

        let demo = new DemoRequest ({
            schoolName,
            contactPerson,
            contactEmail, 
            contactLocation, 
            AreaOfInterest,
            contactPhoneNumber, 
            schoolRole,
            HowDidYouHear
        })

        await demo.save();

        res.status(200).json({
            status: 200,
            success: true,
            data: demo
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default demoRequest;