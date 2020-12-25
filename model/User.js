const mongoose =require('mongoose')

const Users = mongoose.Schema({

name : {
    type: String,
    required :true
},

userName :{type : String},

email : {type: String}


})

module.exports=mongoose.model('Users',Users)