
import dotenv from 'dotenv';
import Roles from '../../model/Roles';
import Permissions from '../../model/Permissions';




dotenv.config();


const createRoles = async (req, res) => {

    try {



        const { role_name, permissions } = req.body;


        const check = await Roles.find({role_name: role_name})

        if (check.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'Role Title already exists'
            })
            return;
        }


        let roles = new Roles ({
            role_name, 
            permissions
        })

        await roles.save();

        res.status(200).json({
            status: 200,
            success: true,
            data: roles
        })

       

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default createRoles;
