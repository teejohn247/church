
import dotenv from 'dotenv';
import Forms from '../../../model/SchoolOnboardingForm';
const AWS = require('aws-sdk');







dotenv.config();



const createSchoolOnboardingForm = async (req, res) => {

    try {

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWSACCESSKEY,
            secretAccessKey: process.env.AWSSECRETKEY
        });

        const { sections, textbox, header, footer, form_name } = req.body;

        const check = await Forms.find({form_name: form_name})
    
        if (check.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'Form already exists'
            })
            return;
        }

    
        if(req.body.header.logo){
        
            const base64Image = req.body.header.logo;

            // const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

            // Getting the file type, ie: jpeg, png or gif
            const type = base64Image.split(';')[0].split('/')[1];
            const fileName = `${Date.now().toString()}.${type}`;

            
            // const imageBuffer = Buffer.from(base64Image, 'base64');
            const imageBuffer = new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""))

            
            const uploadParams = {
              Bucket: process.env.AWSBUCKETNAME,
              Key: fileName,
              Body: imageBuffer,
              ContentEncoding: 'base64', // required
              ContentType: `image/${type}` // required. Notice the back ticks
            };

            
            s3.upload(uploadParams, async(error, data) => {
              if (error) {
                console.error('Error uploading image to AWS S3:', error);
                res.status(400).json({
                    status: 400,
                    success: true,
                    data: error
                })
              } else {
                console.log('Image uploaded successfully.');
                console.log('Public URL:', data.Location);

                header.logo = data.Location
                footer.logo = data.Location


                let form = new Forms ({
                    sections,
                    header,
                    footer,
                    form_name,
                    created_by: req.payload.id
                })
                 await form.save();

        
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: form
                })
              }

    
            });
        } else{

            let form = new Forms ({
                sections,
                textbox,
                header,
                footer,
                form_name,
                created_by: req.payload.id
            })
             await form.save();

    
            res.status(200).json({
                status: 200,
                success: true,
                data: form
            })

        }
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default createSchoolOnboardingForm;
