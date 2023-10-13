import Admin from '../../model/Admin';
import dotenv from 'dotenv';


dotenv.config();


const deactivateAdmin = async(req, res) => {
    try{
        const admin = await Admin.find({_id: req.params.admin_id});

        if (!admin) {
            res.status(400).json({
                status: 400,
                error: 'Admin does not exist'
            })
            return;
        }


        if (admin[0].status =="Pending") {
            res.status(400).json({
                status: 400,
                success: false,
                data: "You can only activate or deactivate an admin that is either Activated or Deactivated"
            })
            return;
        }

        if (admin[0].status =="true") {

            await admin[0].updateOne({
                status: "false"
            }, admin);

            res.status(200).json({
                status: 200,
                success: true,
                data: "Admin Disabled",
            })
          
        }

        else if (admin[0].status == "false") {
            await admin[0].updateOne({
                status: "true"
            }, admin);
            res.status(200).json({
                status: 200,
                success: true,
                data: "Admin Enabled",
            })
        }
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default deactivateAdmin;
