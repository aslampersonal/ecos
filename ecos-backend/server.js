const express = require("express")
const connectDB = require("./database")
const router = require("./testrouter")
var cors = require('cors')

const app = express()

const adminRoutes = require ("./routes/adminRoutes");
const userRoutes = require ("./routes/userRoutes");

app.use(cors())
app.use(express.json())

connectDB();

app.use(adminRoutes);
app.use(userRoutes);

app.get('/',(req,res) => {
    res.json("API IS RUNNING");
})

const PORT = 3000;

app.listen(PORT,()=>console.log(`SERVER IS RUNNING ON PORT ${PORT}`))

