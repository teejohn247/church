
import dotenv from 'dotenv';
import Demo from '../../model/DemoRequests';


dotenv.config();


const fetchDemo = async (req, res) => {

    try {


        const count = await Demo.find().countDocuments()



        res.status(200).json({
            status: 200,
            success: true,
            TotalDemoRequests: count
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default fetchDemo;
