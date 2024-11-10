const cors = require('cors');

const db = require('./database/db')
const dotenv = require('dotenv')
const express= require("express")
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
const authenticate = require("./middleware/authenticate")


dotenv.config()

const app = express()

db.connectDb()

app.use(express.json())
// app.use(authenticate.authenticate)

// Enable CORS for all routes
app.use(cors());


app.use('/api/user', userRoutes)
app.use('/api/blog', blogRoutes)

const port= process.env.port || 8001

app.listen(port, () => console.log(`server started on port : ${port}`))

    