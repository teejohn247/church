
import dotenv from 'dotenv';
import Demo from '../../model/DemoRequests';


dotenv.config();


const getPending = async (req, res) => {

    try {
        const { page, limit } = req.query;


        let demo = await Demo.find({ status: "Pending" })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        const count = await Demo.find().countDocuments()

        if (!demo) {
            res.status(400).json({
                status: 400,
                error: 'No Pending Requests'
            })
            return;
        }

        res.status(200).json({
            status: 200,
            success: true,
            data: demo,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default getPending;
