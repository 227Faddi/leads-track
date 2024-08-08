const LeadsDB = require('../models/leads')

module.exports = {
    getLeads: async (req,res)=>{
        try{
            const leadsItems = await LeadsDB.find()
            res.render('leads.ejs', {leads: leadsItems})
        }catch(err){
            console.log(err)
        }
    },
    addLead: async (req, res)=>{
        try{
            function capitalizeWords(words) {
                return words.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            }
            req.body.name = capitalizeWords(req.body.name)
            req.body.industry = capitalizeWords(req.body.industry)

            await LeadsDB.create(req.body)
            console.log('leads has been added!')
            res.redirect('/leads')
        }catch(err){
            console.log(err)
        }
    },
    markContacted: async (req, res)=>{
        try{
            await LeadsDB.findOneAndUpdate({_id:req.body.itemFromJS},{
                contacted: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markUnContacted: async (req, res)=>{
        try{
            await LeadsDB.findOneAndUpdate({_id:req.body.itemFromJS},{
                contacted: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteLead: async (req, res)=>{
        console.log(req.body.itemFromJS)
        try{
            await LeadsDB.findOneAndDelete({_id:req.body.itemFromJS})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    