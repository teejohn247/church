
import dotenv from 'dotenv';
import Calendly from '../../model/Calendly';
import DemoRequest from '../../model/DemoRequests';


dotenv.config();


const calendly = async (req, res) => {

    try {

        const { event, created_by, payload} = req.body;

        let calendly = new Calendly ({
            event, 
            created_by, 
            payload
        })

        let demoRequest = new DemoRequest ({
            payload
        })

        await calendly.save();
        await demoRequest.save();


        res.status(200).json({
            status: 200,
            success: true,
            data: "Data saved!"
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default calendly;
