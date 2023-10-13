
import dotenv from 'dotenv';
import Roles from '../../model/Roles';
import Admin from '../../model/Admin';

import mongoose from 'mongoose'

dotenv.config();


const assignRole = async (req, res) => {

    try {


        const { role_id, admin_id } = req.params;

        const role = await Roles.findOne({ _id: role_id });
        const admin = await Admin.findOne({ _id: admin_id });

        if (!role) {
            res.status(404).json({
                status: 404,
                error: 'This role does not exist'
            })
            return
        }

        if (!admin) {
            res.status(404).json({ 
                status: 404,
                error: 'This admin does not exist'
            })
            return
        }

        // check if this form has already been assigned to admin

        let check_role = await Roles.find({ _id: mongoose.Types.ObjectId(role_id) },
            { 'assigned_to': { $elemMatch: { admin_id: mongoose.Types.ObjectId(admin_id)} } })


            let check_admin = await Admin.find({ _id: mongoose.Types.ObjectId(admin_id)},
                { roles: { $elemMatch: { role_id: mongoose.Types.ObjectId(role_id) } } })


        if (role.enabled != true) {
            res.status(400).json({
                status: 400,
                error: 'Role has been disabled. Enable role before assigning to admin'
            })
            return
        }

        if (check_role[0].assigned_to.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'This role has already been assigned to admin'
            })
            return
        }

        if (check_admin[0].roles.length > 0) {

            res.status(400).json({
                status: 400,
                error: 'Role already exist'
            })
            return
        }

       
        Admin.findOneAndUpdate({ _id: admin_id },  {  $set: { "roles.role_id": role_id, "roles.role_name": role.role_name, "roles.date_assigned": new Date()} } ,
        { upsert: true, new: true },
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
                Roles.findOneAndUpdate({ _id: role_id }, { $push: { assigned_to: { admin_id: admin_id, admin_name: `${admin.firstName} ${admin.lastName}`, date_assigned: new Date() } } },

                    { upsert: true, new: true },
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

                        }
                        else {

                            res.status(200).json({
                                status: 200,
                                success: true,
                                data: "Admin Role assigned"
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
export default assignRole;
