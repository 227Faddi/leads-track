const express = require('express')
const router = express.Router()
const leadsController = require('../controllers/leads')

router.get('/', leadsController.getLeads)

router.post('/addLead', leadsController.addLead)

router.put('/markContacted', leadsController.markContacted)

router.put('/markUnContacted', leadsController.markUnContacted)

router.delete('/deleteLead', leadsController.deleteLead)

module.exports = router