
import dotenv from 'dotenv';
import Demo from '../../model/DemoRequests';


dotenv.config();


const updateStatus = async (req, res) => {

    try {


        let demo = await Demo.findOne({ _id: req.params.id });

        if (!demo) {
            res.status(400).json({
                status: 400,
                error: 'Demo does not exist'
            })
            return;
        }

        if(demo.status !== "Pending"){
            res.status(400).json({
                status: 400,
                error: 'Demo has been already marked completed'
            })
            return;
        }
    

        await demo.updateOne({

            status: "Completed", 
        
        });



        res.status(201).json({
            status: 201,
            success: true,
            data: "Update Successful",
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default updateStatus;
