const Razorpay = require('razorpay');
const crypto= require('crypto')

const orders = async (req,res)=>{
   
let instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

let options = {

  amount: req.body.amount*100,  // amount in the smallest currency unit
  currency: "INR",
  
};
instance.orders.create(options, function(err, order) {
    if(err){
        return res.status(400).send("server error")
    }
  return res.status(200).send({message:'order created', data:order})
});
}

const verify=async (req,res)=>{
    let body=req.body.response.razorpay_order_id + "|"+ req.body.response.razorpay_payment_id;

    var expectedSignature= crypto.createHmac('sha256',process.env.KEY_SECRET).update(body.toString()).digest('hex');
    if ( expectedSignature === req.body.response.razorpay_signature){
      res.status(200).send({message:"signature valid"});
    }
    else{
        res.status(400).send({message:"signature not valid"});
    }
}
module.exports.verify=verify;
module.exports.orders=orders;