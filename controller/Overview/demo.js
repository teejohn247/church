
import dotenv from 'dotenv';
import Demo from '../../model/DemoRequests';


dotenv.config();


const demoGraph = async (req, res) => {

    try {

        const demo = await Demo.aggregate([
            {
                $group: {
                    "_id": {
                        "year" : {
                            $year : "$createdAt"
                        },
                        "month" : {
                            $month : "$createdAt"
                        }
                    },
                    "total": {
                        $sum: 1
                    },
                },

            }
        ])

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
export default demoGraph;
