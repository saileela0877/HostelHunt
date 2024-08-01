const express=require('express')
const connectMongo = require('./db')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
connectMongo();
const port = 5000;

app.use('/api/auth',require('./routes/auth'))
app.use('/api/hostels',require('./routes/hostel'))


app.listen(port, ()=>{
  console.log("App is listening at port",port)
})