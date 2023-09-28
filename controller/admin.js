const product = require('../model/products');
const users = require('../model/users');


//creating product 
const createProduct = async (req, res) => {
    const products = new product({
        productName: req.body.productName,
        category: req.body.category,
        productPrice: req.body.productPrice,
        productImage:req.body.productImage,
        productId: "#00"+ (product.length+1),
    })
    try {
        await products.save();
        res.status(200).send("Product created sucessfully")
    }
    catch (error) {
        res.status(200).send("error")
    }
}

//deleting product
const deleteProduct = async (req, res) => {
  const data =  await product.deleteOne({ _id: req.params.id });
    try {
        res.status(200).send(data)
    }
    catch (error) {
        res.status(400).send(error)
    }
}

//updating the product
const updateProduct = async (req, res) => {
  const products=  await product.findOne({_id: req.params.id })

    await products.updateOne({ productName: req.body.productName,
        category: req.body.category,
        productPrice: req.body.productPrice, productImage:req.body.productImage})
    
    try {
        res.status(200).send("Updated  sucessfully")
    }
    catch (error) {
        res.status(400).send(error)
    }
}

const getUsers=async(req,res)=>{
    try{
        const find= await users.findOne({"role":"admin"})
        res.status(200).send(find.rentedUser)

    }
    catch(error){
        res.status(400).send(error)
    }
}

module.exports.getUsers=getUsers;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct=updateProduct;

