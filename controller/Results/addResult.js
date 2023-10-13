
import dotenv from 'dotenv';
import Forms from '../../model/Results';
const AWS = require('aws-sdk');



dotenv.config();


const createResultManagement = async (req, res) => {

    try {

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWSACCESSKEY,
            secretAccessKey: process.env.AWSSECRETKEY
        });

        const { quantitative, grading_system,qualitative_assessment, behavioural_assessment, comments, students_information, grading_key, header, footer, template_name } = req.body;

        const check = await Forms.find({template_name: template_name})


        console.log(quantitative, grading_system, behavioural_assessment, comments, students_information, grading_key, header, footer, template_name)
    
        if (check.length > 0) {
            res.status(400).json({
                status: 400,
                error: 'Template_name already exists'
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
                    header,
                    footer,
                    template_name,
                    quantitative, 
                    grading_system, 
                    behavioural_assessment, 
                    qualitative_assessment,
                    comments, 
                    students_information, 
                    grading_key,
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
        } else {

            let form = new Forms ({
                header,
                footer,
                template_name,
                quantitative, 
                grading_system, 
                behavioural_assessment, 
                comments, 
                qualitative_assessment,
                students_information, 
                grading_key,
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
export default createResultManagement;
