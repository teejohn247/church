import Template from '../../model/DataOnboarding';
import dotenv from 'dotenv';


dotenv.config();


const onboardingForm = async(req, res) => {
    try{

        const count = await Template.find().countDocuments()
        const admission = await Template.find({type:"admission"}).countDocuments()
        const student = await Template.find({type: "student"}).countDocuments()
        const staff = await Template.find({type:"staff"}).countDocuments()

        console.log(student)

            res.status(200).json({
                status: 200,
                success: true,
                total: count,
                totalStudent: student,
                totalStaff: staff,
                totalAdmission: admission,
            })
       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default onboardingForm;
