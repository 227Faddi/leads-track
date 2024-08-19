import express from 'express';
import dashboardController from '../controllers/dashboard.js';
import authMiddleware from '../middleware/home.js'
import trimRequest from 'trim-request';


const router = express.Router()

router.get('/', authMiddleware.ensureAuth, dashboardController.getDashboard)

// Add
router.get('/addLeadForm', authMiddleware.ensureAuth, dashboardController.addLeadForm)
router.post('/addLead', authMiddleware.ensureAuth, trimRequest.all, dashboardController.addLead)

//Edit
router.get('/editLeadForm/:id', authMiddleware.ensureAuth, dashboardController.editLeadForm)

router.put('/editLead/:id', authMiddleware.ensureAuth, trimRequest.all, dashboardController.editLead)


router.put('/updateStatus/:id', authMiddleware.ensureAuth, trimRequest.all, dashboardController.updateStatus)

router.delete('/deleteLead/:id', authMiddleware.ensureAuth, dashboardController.deleteLead)




export default router;
