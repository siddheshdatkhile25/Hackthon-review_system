const express = require("express")
const userRoutes = require("./routes/userRoutes")
const cors = require('cors')

const app = express()


// Middleware to parse JSON 
app.use(cors())
app.use(express.json());


// Routes
app.use("/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Movie Reviews API Server Running')
})

app.listen(4000, 'localhost', () =>{
    console.log("Server started at port 4000")
})