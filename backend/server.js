const express = require("express")
const cors = require("cors")
const router = require("./routes/auth-router")
const connectDb = require("./config/db")

const app = express();
app.use(cors())
app.use (express.json())
app.use ("", router)


connectDb().then(()=> {
    app.listen (8000, ()=> {

    console.log("Server started");
    
})

})

