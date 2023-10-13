
import dotenv from 'dotenv';
import Forms from '../../../model/SchoolOnboardingForm';
import ClientForm from '../../../model/TenantsOnboardingForm';
import School from '../../../model/School';



dotenv.config();


const assignForm = async (req, res) => {

    try {


        const { form_id } = req.params;
        const {module, schools} = req.body;


        const form = await Forms.findOne({ _id: form_id });

       
        let ids = [];


        schools.map((sch, index) => {
            ids.push(sch.school_id)
        })


       

        let all_schools = await School.find({ _id: { $in : ids }})


        console.log({all_schools})
        if (!form) {
            res.status(404).json({
                status: 404,
                error: 'This form does not exist'
            })
            return
        }


        if (form.enabled !== true) {
            res.status(400).json({
                status: 400,
                error: 'Form has been disabled.'
            })
            return;
        }


         School.update({ _id: { $in: ids } }, {
            $pull: { "school_onboarding_form_assigned": { form: form_id } },
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

                // Forms.update({ _id: form_id }, {
                //     $pull: { "assigned_to": { school_id: { $in : ids }} },
                // },
                Forms.update({ _id: form_id }, 
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
                                
                            schoolData.push({ school_id: school._id, school_name: school.schoolName, tenant_id:school.tenantId, school_logo: school.schoolLogo, module: module, date_assigned: new Date() })
                        })
                
                        School.findOneAndUpdate({ _id: { $in : ids }}, { $push: { school_onboarding_form_assigned: { form_id: form_id, form_name: form.form_name, module: module, date_assigned: new Date()} } },
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
                                Forms.findOneAndUpdate({ _id: form_id }, { $push: { assigned_to: { $each: schoolData} }},
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
                                            // school_name

                                            console.log({form})
                                            
                                    
                                            ClientForm.remove({ form_id: form_id }, 
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
                                                      
                                                    } else{

                                                        schoolData.map((rol, i) => {
                                                            new ClientForm({
                                                                tenant_id: rol.tenant_id,
                                                                form_id: form_id,
                                                                sections: form.sections,
                                                                header: form.header,
                                                                footer: form.footer,
                                                                form_name: form.form_name,
                                                                created_by: form.created_by,
                                                                module: module
                                                            }).save()
                                                        })

                                                    }
                                                })
                                          return res.status(200).json({
                                                status: 200,
                                                success: true,
                                                data: result
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
export default assignForm;
