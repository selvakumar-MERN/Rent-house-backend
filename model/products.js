const mongoose= require("mongoose");
const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        min:3,
        max:225,
    },
    productId:{
        type:String,
    },
    category:{
        type:String,
        required:true,
        min:3,
        max:225,
    },
    productPrice:{
        type:String,
        required:true,
        min:3,
        max:225,
    },
    productImage:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    },
    fromDate:{
        type:Date,
        default:0
    },
    toDate:{
        type:Date,
        default:0
    },
    fromTime:{
        type:String,
        default:0
    },
    toTime:{
        type:String,
        default:0
    
    },
    hours:{
        type:Number,
        default:1,
    },
    userName:{
        type:String,

    },
    email:{
        type:String,
    }

    

})

module.exports=mongoose.model('products',productSchema);