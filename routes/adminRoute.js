import express from 'express';

import createZone from '../controller/Zones/createZone';
import createCell from '../controller/Zones/createCell';
import createFirstTimers from '../controller/Zones/createFirstTimer';
import fetchFirstTimers from '../controller/Zones/fetchFirstTimers';
import fetchCells from '../controller/Zones/fetchCells';
import fetchZones from '../controller/Zones/fetchZones';
import updateZones from '../controller/Zones/updateZones';
import updateCell from '../controller/Zones/updateCell';
import updateFirstTimers from '../controller/Zones/updateFirstTimers';
import deleteFirstTimers from '../controller/Zones/deleteFirstTimers';
import deleteZone from '../controller/Zones/deleteZone';
import deleteCells from '../controller/Zones/deleteCells';
import fetchFirstTimersDetails from '../controller/Zones/fetchFirstTimersDetails';
import fetchCellDetails from '../controller/Zones/fetchCellsDetails';
import fetchZonesDetails from '../controller/Zones/fetchZoneDetails';


const { userValidationRules, validate } = require('../middleware/signUpValidation')

const router = express.Router();


router.post('/createZones', createZone);
router.post('/createCells', createCell);
router.post('/createFirstTimers', createFirstTimers);
router.get('/getFirstTimers', fetchFirstTimers);
router.get('/getCells', fetchCells);
router.get('/getZones', fetchZones);
router.get('/getFirstTimers/:id', fetchFirstTimersDetails);
router.get('/getCells/:id', fetchCellDetails);
router.get('/getZones/:id', fetchZonesDetails);
router.patch('/updateZone/:id', updateZones);
router.patch('/updateCell/:id', updateCell);
router.patch('/updateFirstTimer/:id', updateFirstTimers);
router.delete('/deleteFirstTimer/:id', deleteFirstTimers);
router.delete('/deleteZone/:id', deleteZone);
router.delete('/deleteCell/:id', deleteCells);


















export default router;