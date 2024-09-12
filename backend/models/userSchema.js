import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    bio : {
        type : String,
        required : true
    }
},{
    timestamps : true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.createJwt = function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            email : this.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn : 7*24*60*60*1000
        }
    )
}

userSchema.methods.comparePassword = async function(textpassword){
    return await bcrypt.compare(textpassword,this.password)
}

const User = mongoose.model('User',userSchema)

export default User