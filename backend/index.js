import dotenv from 'dotenv'
import app from "./app.js";
import connectToDb from "./db/db.js";

dotenv.config({
    path : '.env'
})

connectToDb()

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})
