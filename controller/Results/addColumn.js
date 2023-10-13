
import dotenv from 'dotenv';
import Formulars from '../../model/Formulars';
const AWS = require('aws-sdk');



dotenv.config();


const addColumn = async (req, res) => {

    try {

        console.log('Average')

        let formular = new Formulars ({
                name: "Class Maximum",
                formula: "Math.max(...array)"
        })

        // let formular = new Formulars ({
        //     columns:[{
        //         column_name: "RANKING",
        //         formula: "[...numbers].sort((a, b) => b - a).map(num => sortedNumbers.indexOf(num) + 1)"
        //     }]
        // })
        await formular.save();

        res.status(200).json({
            status: 200,
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            error: error
        })
    }
}
export default addColumn;
