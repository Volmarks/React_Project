require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const todosRoutes = require("./routes/todoApi")

const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())
const port = process.env.PORT || 8080

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/todo", todosRoutes)

            
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose
    .connect(
        `mongodb+srv://Volodymyr:mongodbpass@aiproject.jgunw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
        connectionParams
    )
    .then( () => {
        app.listen(port, () => console.log(`Listening on the port ${port}`))
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    }) 