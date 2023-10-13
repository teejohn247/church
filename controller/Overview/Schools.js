import School from '../../model/School';
import dotenv from 'dotenv';


dotenv.config();


const schools = async(req, res) => {
    try{

        const onboarded = await School.aggregate([
            { $match : { onboarded : true } },
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
                    "onboarded": { "$first": "$onboarded"},
                    schoolNames: { $addToSet: "$schoolName" }
                },

            }
        ])


        const unboarded = await School.aggregate([
            { $match : { onboarded : false } },
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
                    "onboarded": { "$first": "$onboarded"},
                    schoolNames: { $addToSet: "$schoolName" }
                },

            }
        ])




        // if(!schools){
        //     res.status(404).json({
        //         status:404,
        //         success: false,
        //         error:'No schools Found'
        //     })
        //     return
        // }else{
            res.status(201).json({
                status: 201,
                success: true,
                onboarded: onboarded,
                unboarded: unboarded,

                
            })
        // }
       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default schools;
