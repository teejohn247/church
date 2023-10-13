import Notificatiotions from '../../model/NotificationLog'
import dotenv from 'dotenv';


dotenv.config();


const notification = async(req, res) => {
    try{
     
        const count = await Notificatiotions.find().countDocuments()
        const whatsapp = await Notificatiotions.find({channel: 'whatsapp'}).countDocuments()
        const sms = await Notificatiotions.find({channel: 'sms'}).countDocuments()
        const email = await Notificatiotions.find({channel: 'email'}).countDocuments()


            res.status(200).json({
                status: 200,
                success: true,
                total: count,
                whatsapp,
                sms,
                email
            })
       
    }catch(err){
        res.status(500).json({
            status: 500,
            success: false,
            error: err
        })
    }
}

export default notification;
