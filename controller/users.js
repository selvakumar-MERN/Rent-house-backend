const users= require('../model/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const joi =require('@hapi/joi')

//Verification with joi
const usersSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(3).required().email(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.string().min(8).required(),
    confirmPassword: joi.any().equal(joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })
});

//registration
const userRegistration = async (req, res) => {
    
    const emailfound = await users.findOne({ email: req.body.email })
    if (emailfound) {
        return res.status(400).send("Email already exist")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const hashedconf = await bcrypt.hash(req.body.confirmPassword, salt);

    const createUser = new users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        confirmPassword: hashedconf
    })


    try {
        const { error } = await usersSchema.validateAsync(req.body);
        if (error) {
            res.status(400).send(error)
        }
        else {

            await createUser.save();
            return res.status(201).send("Registration successfull please Login");
        }
    }

    catch (error) {
        res.status(400).send(error)

    }
}

//user login
const userLogin = async (req, res) => {
    const User = await users.findOne({ email: req.body.email })
    if (!User) {
        return res.status(400).send("Invalid email")
    }

    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if (!validPassword)
        return res.status(400).send("Invalid password");
    try {

        const token = jwt.sign({ email: User.email }, process.env.TOKEN_SECRET);
        res.header("auth_token", token).send({token:token,user:User.role});
    }

    catch (error) {
        res.status(400).send(error)
    }

}


//user login verification
const verifyLogin = async (req, res) => {
    const { token } = req.body
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        if (verify) {
            await users.findOne({ email: verify.email })
                .then((res) =>res.toJSON()) 
                .then((data)=>{
                    
                    res.status(200).send(data)
                })

        }

    }
    catch {
        res.status(400).send('invalid token')
    }
}


const allUsers= async(req,res)=>{
    const findusers = await users.find();
    if(!findusers){
        return res.status(400).send(error)
    }
    else{
        return res.status(200).send(findusers)
    }
}

const deleteUser = async (req, res) => {
    const data =  await users.deleteOne({ _id: req.params.id });
      try {
          res.status(200).send(data)
      }
      catch (error) {
          res.status(400).send(error)
      }
  }

const cart= async(req,res)=>{
    try{
         const find= await users.findOne({"email":req.body.email})
         res.status(200).send(find.cart)

    }
    catch(error){
        res.status(400).send(error)
    }
}  

const deleteCart= async(req,res)=>{
    const {id}=req.params
    try{
        const deleteProduct= await users.updateOne({"email":req.body.email},{$pull:{cart:{_id:id}}})
        res.status(200).send(deleteProduct)
    } 
    catch(error){
            res.status(400).send(error)
    }
}

const updateorders= async(req,res)=>{
    const{email,address}=req.body
    console.log(email,address)
    try{
        const find= await users.findOne({"email":email})
        const cartitems=find.cart
        cartitems.map(async (items)=>
        await users.updateOne({"email":email},{$push:{"rentedItem":{"productName": items.productName ,"productId":items.productId,"productPrice":items.productPrice,
        "category":items.category,"productImage":items.productImage,"quantity":items.quantity,"fromDate":items.fromDate,
         "fromTime":items.fromTime,"toDate":items.toDate,"toTime":items.toTime,"hours":items.hours,"deliveryAddress":address}}})
        )
    
        cartitems.map(async (items)=>
        await users.updateOne({"role":"admin"},{$push:{"rentedUser":{"userName":find.name ,"userEmail":find.email ,"productName": items.productName ,"productPrice":items.productPrice,
        "category":items.category,"quantity":items.quantity,"fromDate":items.fromDate,
         "fromTime":items.fromTime,"toDate":items.toDate,"toTime":items.toTime,"hours":items.hours,"deliveryAddress":address}}})
        )
    }
    catch(error){
        res.status(400).send(error)
    }
}

const order= async(req,res)=>{
    const{email}=req.body
    try{
          const find= await users.findOne({"email":email})
        // const val= find.rentedItem.map(items=>items.orderedDate.toDateString)
          res.status(200).send(find.rentedItem)
    }
    catch(error){
        res.status(400).send(error)
    }
}

module.exports.order=order;
module.exports.updateorders=updateorders;
module.exports.cart=cart;
module.exports.deleteCart=deleteCart;
module.exports.userRegistration=userRegistration;
module.exports.userLogin=userLogin;
module.exports.verifyLogin=verifyLogin;
module.exports.allUsers=allUsers;
module.exports.deleteUser=deleteUser;