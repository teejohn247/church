
import dotenv from 'dotenv';
import Roles from '../../model/Roles';
// import Permissions from '../../model/Permissions';




dotenv.config();


const editRole = async (req, res) => {

    try {



        const { role_name, permissions } = req.body;


        const role = await Roles.findOne({_id: req.params.role_id})

        console.log(role)

        if (role.length < 1) {
            res.status(400).json({
                status: 400,
                error: 'Role does not exist'
            })
            return;
        }


        await role.updateOne({

            role_name: role_name && role_name,
            permissions: permissions && permissions
        
        });

        console.log('jjh')

        await role.save();

        res.status(200).json({
            status: 200,
            success: true,
            data: "Role updated"
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default editRole;
