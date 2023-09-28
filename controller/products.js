const product= require('../model/products');
const users = require('../model/users');
const user= require('../model/users')
const moment= require('moment')

const allProducts= async(req,res)=>{
    const findproducts = await product.find();
    if(!findproducts){
        return res.status(400).send(error)
    }
    else{
        return res.status(200).send(findproducts)
    }
}
const cartProducts= async(req,res)=>{
    const {id}=req.params
    await product.updateOne({"_id":id},{$set:{"hours":1}})
    
    const findproducts = await product.find({_id:id});
    const foundproduct={...findproducts}
    if(!findproducts){
        return res.status(400).send(error)
    }
    else{
        await user.updateOne({"email":req.body.email},{$push:{"cart":{"productName":foundproduct[0].productName,"productId":foundproduct[0].productId,"productPrice":foundproduct[0].productPrice,
    "category":foundproduct[0].category,"productImage":foundproduct[0].productImage,"quantity":foundproduct[0].quantity,"fromDate":foundproduct[0].fromDate,
     "fromTime":foundproduct[0].fromTime,"toDate":foundproduct[0].toDate,"toTime":foundproduct[0].toTime,"hours":foundproduct[0].hours}}})
        return res.status(200).send(findproducts)
    }
}



const calender= async(req,res)=>{
       const{id}=req.params
       const {email,fromDate,fromTime,toDate,toTime}=req.body
       
       const starttime= moment(`${fromDate}T${fromTime}`)
       const endtime=moment(`${toDate}T${toTime}`)
       const duration= moment.duration(endtime.diff(starttime));
       const hours=parseInt(duration.asHours())
       
      try{
           
            await users.updateOne({"cart._id":id},{$set:{"cart.$.fromDate":fromDate,"cart.$.fromTime":fromTime,"cart.$.toDate":toDate,"cart.$.toTime":toTime,"cart.$.hours":hours}})
            return  res.status(200).send(hours.toString())
      }
      catch(error){
                res.status(400).send(error)
      }
  
}


        


module.exports.calender=calender;
module.exports.cartProducts=cartProducts;
module.exports.allProducts=allProducts;