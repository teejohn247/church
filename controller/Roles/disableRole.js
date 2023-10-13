import Admin from '../../model/Admin';
import Roles from '../../model/Roles';

import dotenv from 'dotenv';


dotenv.config();


const disableRole = async (req, res) => {
    try {



        const { role_id } = req.params;

        const { status } = req.body;


        const role = await Roles.findOne({ _id: role_id });



        if (!role) {
            res.status(404).json({
                status: 404,
                error: 'This role does not exist'
            })
            return
        }


        await role.updateOne({
            enabled: status
        }, role);

        await role.save();

        let ids = [];

        role.assigned_to.map((rol, i) => {
            ids.push(rol.admin_id)
        })

        Admin.update({ _id: { $in: ids } }, {
            $set: {
                'roles.enabled': status,
            },
        },
            { multi: true },
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

                } else {



                    res.status(200).json({
                        status: 200,
                        success: true,
                        data: "Role status updated"
                    })



                }
            })


    } catch (err) {
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default disableRole;
