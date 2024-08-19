import LeadsDB from '../models/Lead.js';

export default {
    getDashboard: async (req,res)=>{
        try{
            const leadsItems = await LeadsDB.find({userId: req.user.id })
            const statusOrder = ['new', 'contacted', 'pending', 'closed'];
            leadsItems.sort((a, b) => {
                return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
            });
            res.render('dashboard.ejs', {leads: leadsItems})
        }catch(err){
            console.log(err)
        }
    },
    addLeadForm: (req, res)=>{
        try{
            res.render('addLead.ejs')
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
            req.body.userId = req.user.id;
            await LeadsDB.create(req.body)
            res.redirect('/dashboard')
        } catch(err){
            console.error(err)
        }
    },
    editLeadForm: async (req, res)=>{
        try{
            const leadItem = await LeadsDB.findById(req.params.id)
            res.render('editLead.ejs', { lead: leadItem })
        }catch(err){
            console.log(err)
        }
    },
    editLead: async (req, res)=>{
        try{
            let lead = await LeadsDB.findById(req.params.id)
            if (!lead) {
                return res.redirect('/dashboard')
            }
            if (lead.userId != req.user.id) {
                res.redirect('/dashboard')    
            } else {
                lead = await LeadsDB.findOneAndUpdate({ _id: req.params.id }, req.body, {
                    new: true,
                    runValidators: true,
                })
                res.redirect('/dashboard')
            }
        }catch(err){
            console.log(err)
        }
    },
    updateStatus: async (req, res)=>{
        try{
            await LeadsDB.findOneAndUpdate({_id: req.params.id},{
                status: req.body.status
            })
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    deleteLead: async (req, res)=>{
        try{
            console.log(req)
            await LeadsDB.findByIdAndDelete(req.params.id)
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    }
}    