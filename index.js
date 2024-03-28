const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const database = require('./src/database/db')
dotenv.config()

//Rotas
const authRoutes = require('./src/routes/AuthRoutes');
const userRouter= require('./src/routes/UserRoutes')

//Porta do Servidor
const port = process.env.PORT


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

//Conexão com banco de dados
database.test();


app.use('/api/auth',authRoutes)
app.use('/api/user',userRouter)
// app.use('/api/service/',serviceRouter)
// app.use('/api/cliente/',clienteRouter)
// app.use('/api/agendamento/',AgendamentoRouter)
// app.use('/api/produto/',ProdutoRouter)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))