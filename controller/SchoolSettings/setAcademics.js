
import dotenv from 'dotenv';
import Roles from '../../model/Roles';
import School from '../../model/School';




dotenv.config();


const setAcademics = async (req, res) => {


        try {



            const {       
            create_academic_year,
            create_terms,
            create_nursery_classes,
            create_primary_classes,
            create_secondary_classes
            } = req.body;
            const { school_id } = req.params;


            console.log(create_terms)
    
    
    
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
                    "academics_settings.create_academic_year":  create_academic_year &&  create_academic_year,
                    "academics_settings.create_terms": create_terms && create_terms,
                    "academics_settings.create_primary_classes": create_primary_classes&& create_primary_classes,
                    "academics_settings.create_secondary_classes": create_secondary_classes && create_secondary_classes,
                    "academics_settings.create_nursery_classes": create_nursery_classes && create_nursery_classes,

    
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
                        data: "Academics Settings Updated"
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
export default setAcademics;
