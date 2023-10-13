
import dotenv from 'dotenv';
import Forms from '../../model/Results';
import School from '../../model/School';



dotenv.config();


const assignResult = async (req, res) => {

    try {


        const { result_id } = req.params;
        const {schools} = req.body;


        const form = await Forms.findOne({ _id: result_id });

       console.log({form})
        let ids = [];


        schools.map((sch, index) => {
            ids.push(sch.school_id)
        })

        console.log({schools})

        let all_schools = await School.find({ _id: { $in : ids }})

        console.log({all_schools})

        if (!form) {
            res.status(404).json({
                status: 404,
                error: 'This result does not exist'
            })
            return
        }


        if (form.enabled !== true) {
            res.status(400).json({
                status: 400,
                error: 'result has been disabled.'
            })
            return;
        }

        console.log(form.enabled)



         School.update({ _id: { $in: ids } }, {
            $pull: { "results_assigned": {result_id } },
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

            }else{
                Forms.update({ _id: result_id }, 
                {$pull: {assigned_to: {$exists: true}}},
                
                function (
                    err,
                    result
                ) {
                    if (err) {

                        return res.status(401).json({
                            status: 401,
                            success: false,
                            error: err
        
                        })
                      
                    }else{
                        let schoolData = [];

                        all_schools.map((school, i) => {
                                
                            schoolData.push({ school_id: school._id, school_name: school.schoolName, school_logo: school.schoolLogo, date_assigned: new Date() })
                        })

                        console.log({schoolData})
                
                        School.findOneAndUpdate({ _id: { $in : ids }}, { $push: { results_assigned: { result_id: result_id, result_name: form.template_name, date_assigned: new Date()} } },
                        { upsert: true},
                        function (
                            err,
                            result
                        ) {
                            if (err) {
                               return res.status(401).json({
                                    status: 401,
                                    success: false,
                                    error: err
                
                                })

                
                            } else {
                                console.log({schoolData})
                                Forms.findOneAndUpdate({ _id: result_id }, { $push: { assigned_to: { $each: schoolData} }},
                                    { upsert: true },
                                    function (
                                        err,
                                        result
                                    ) {
                
                                        if (err) {
                                          return res.status(401).json({
                                                status: 401,
                                                success: false,
                                                error: err
                                            })
                
                                        }
                                        else {

                                          return res.status(200).json({
                                                status: 200,
                                                success: true,
                                                data: "Result assigned Successfully"
                                            })


                                           
                                        }
                                    })
                            }
                        })
                    }
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default assignResult;
