const express = require('express')
const app = express()

const authRoutes = require('./AuthRoutes');
const userRouter= require('./UserRoutes')
const ProductRoutes= require('./ProductRoutes')
const CartRoutes= require('./CartRoutes')
const OrderRoutes= require('./OrderRoutes')


app.use('/auth',authRoutes)
app.use('/user',userRouter)
app.use('/product',ProductRoutes)
app.use('/cart',CartRoutes)
app.use('/order',OrderRoutes)


module.exports = app 

