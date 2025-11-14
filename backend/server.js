const express = require("express")
const cors = require('cors')

const userRoutes = require("./routes/userRoutes")
const reviewRoutes = require("./routes/review")
const moviesRoutes = require("./routes/movies")

const app = express()


// Middleware to parse JSON 
app.use(cors())
app.use(express.json());


// Routes
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
app.use("/movies",moviesRoutes);

app.get('/', (req, res) => {
    res.send('Movie Reviews API Server Running')
})

app.listen(4000, 'localhost', () =>{
    console.log("Server started at port 4000")
})