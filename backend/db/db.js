import mongoose from "mongoose";

const connectToDb = async function(){
    mongoose.connect(process.env.MONGO_URL)
    .then((conn)=>{
        console.log(`Database connected`)
    })
    .catch((err)=>{
        console.log(`Database connection failed`)
        process.exit(1)
    })
}

export default connectToDb