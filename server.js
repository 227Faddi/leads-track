const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const {MongoClient, ObjectId} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config()

MongoClient.connect(process.env.URI)
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('lead-sync')
    const leadsCollection = db.collection('leads')
    
    app.set('view engine', 'ejs')
  
    app.use(bodyParser.urlencoded({ extended: true }));
  
    app.use(express.static('public'))
    app.use(bodyParser.json())
    
    app.get('/', (req, res) =>{
      leadsCollection
      .find()
      .toArray()
      .then((results)=>{
        res.render('index.ejs', { leads: results })
      })
      .catch((err) =>{
        console.error(err)
      })
    })
  
    app.post('/leads', (req, res) => {
      req.body.contacted = 'no'
      leadsCollection
        .insertOne(req.body)
        .then(result =>{
          res.redirect('/')
        })
        .catch(err => console.error(err))
    })
  
    app.delete('/deleteLead', (req, res) => {
      const id = req.body.itemFromJS;
      const leadId = ObjectId.createFromHexString(id)
      leadsCollection.deleteOne({_id: leadId})
      .then(result => {
        res.json('Lead Deleted')
      })
      .catch(error => console.error(error))
    })
  
    app.put('/contacted', (req, res) => {
      const id = req.body.itemFromJS;
      const leadId = ObjectId.createFromHexString(id)
      leadsCollection.updateOne({_id: leadId},{
        $set: {
            contacted: 'yes'
          }
      })
      .then(result => {
          res.json('Marked Contacted')
      })
      .catch(error => console.error(error))
    })
  
    app.put('/notContacted', (req, res) => {
      const id = req.body.itemFromJS;
      const leadId = ObjectId.createFromHexString(id)
      leadsCollection.updateOne({_id: leadId},{
        $set: {
            contacted: 'no'
          }
      })
      .then(result => {
          res.json('Marked Not Contacted')
      })
      .catch(error => console.error(error))
    })
  
  
    app.listen(PORT, () =>{
      console.log(`The server is running on port: ${PORT}`)
    })
  })
  .catch((err)=>{
    console.error(`Can't connect to the database : ${err}`)
  })



