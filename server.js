require('dotenv').config()
const express = require ('express')
const mongoose = require('mongoose')
const Users = require('./model/User')
const router = express.Router()
const app = express()
app.use(express.json())



let port=process.env.DB_PORT
let dbName=process.env.DB_NAME
let user=process.env.DB_USER
let password=process.env.DB_PASS

const mongo_URI="mongodb+srv://sparthigen:ahmed14ab@profiledb.5ujbd.mongodb.net/Profile?retryWrites=true&w=majority"

mongoose.connect(mongo_URI,{ useNewUrlParser: true, useUnifiedTopology: true}, (err,data) =>{
    if(err){
        throw err
    }else{
        console.log('database connected')
    }
})


//Post
router.post('/api/newUser', (req,res)=>{
    let newUser = new Users(req.body)
    newUser.save((err,data)=>{
        if(err) throw err
        else res.json(data)
    })
})
//Get
router.get('/api/Users', (req,res)=>{
    Users.find((err,data)=>{
        if(err) throw err
        else res.json(data)
    })

})
//Put
router.put('/api/Users/:id',(req,res)=>{
    let newData = req.body
    Users.findByIdAndUpdate({_id: req.params.id},newData,(err,data)=>{
        if(err)throw err
        else res.json('updated')
    })
})
//Delete

router.delete('/api/UsersDelete/:id',(req,res)=>{

Users.findByIdAndDelete({_id:req.params.id},(err,data)=>{
    if(err)throw err
    else res.json('Profile Deleted')
})

})




app.use('/api',Users)

app.listen(port,(err) => {
    if(err){
        throw err
    }else{
        console.log('server is up and running on 5000')
    }
})