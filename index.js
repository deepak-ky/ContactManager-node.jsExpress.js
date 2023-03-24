const express = require('express')
const dotenv = require('dotenv').config()

const errorHandler = require('./middleware/errorHandler')
const contactRouter = require('./routes/contactRoutes')
const userRouter = require('./routes/userRoutes')
const connectDb = require('./config/dbConnection')

const port = process.env.PORT
const app = express()
app.use(express.json())

connectDb();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'UP' })
})

app.use('/api/contacts', contactRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
