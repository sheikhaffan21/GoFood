const express = require('express')

const port = 5000
const mongoDB = require("./db")
const cors = require('cors');
const app = express()

mongoDB()

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend origin
  optionsSuccessStatus: 200, // Some legacy browsers expect this
};

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(cors(corsOptions));

app.use(express.json())
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
// app.use('/api', require("./routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
