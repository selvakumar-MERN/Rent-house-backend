const express=require('express')
const router= express.Router();
const productData=require('../controller/products');
const orderData=require('../controller/payementcontrol');

router.get('/products',productData.allProducts)
router.post('/payment',orderData.orders)
router.post('/verify',orderData.verify)
router.post('/products/:id',productData.cartProducts)
router.post('/calender/:id',productData.calender)



module.exports=router;