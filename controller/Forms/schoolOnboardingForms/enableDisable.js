
import dotenv from 'dotenv';
import Forms from '../../../model/SchoolOnboardingForm';





dotenv.config();


const enableDisable = async (req, res) => {
    try {

        console.log('here')

        const { status } = req.body;


        const form = await Forms.find({ _id: req.params.form_id });

        console.log(form)


        if (!form) {
            res.status(404).json({
                status: 404,
                error: 'This form does not exist'
            })
            return
        }



        await form[0].updateOne({
            enabled: status
        }, form);


        res.status(200).json({
            status: 200,
            success: true,
            data: "Form status updated"
       })

    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default enableDisable;
