const mongoose= require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
    },
    email:{
        type:String,
        required:true,
        min:3,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    role:{
        type:String,
        default:'user'
    },
    confirmPassword:{
        type:String,
        required:true,
        min:6,
    },
    address:{
        type:String,
    },
    cart:[{
        productName:{
            type:String,
            min:3,
            max:225,
        },
        productId:{
           type:String,
        },
        category:{
            type:String,
            min:3,
            max:225,
        },
        productPrice:{
            type:String,
            min:3,
            max:225,
        },
        productImage:{
            type:String,
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
}],
    rentedItem:[{
        productName:{
        type:String,
    },
    productImage:{
        type:String,
    },
        quantity:{
        type:String,
       
    },
    fromDate:{
        type:String,
       
    },
    toDate:{
        type:String,
        
    },
    fromTime:{
        type:String,
        
    },
    toTime:{
        type:String,
        
    },
    hours:{
        type:Number,
        default:1,
    },
    deliveryAddress:{
        type:String,
    },
    status:{
        type:String,
        default:"Order placed",
    },
    orderedDate:{
        type:Date,
        default: new Date
    },
    payment:{
        type:String,
        default:"Paid",
    }
}],
rentedUser:[{
    userName:{
        type:String,
    },
    userEmail:{
        type:String,
    },
    productName:{
    type:String,
},
    quantity:{
    type:String,
   
},
fromDate:{
    type:String,
   
},
toDate:{
    type:String,
    
},
fromTime:{
    type:String,
    
},
toTime:{
    type:String,
    
},
hours:{
    type:Number,
    default:1,
},
deliveryAddress:{
    type:String,
},
status:{
    type:String,
    default:"Order placed",
},
orderedDate:{
    type:Date,
    default: new Date
},
payment:{
    type:String,
    default:"Paid",
}
}]

})
module.exports= mongoose.model("users",userSchema);