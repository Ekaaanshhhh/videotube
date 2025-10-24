import mongoose from "mongoose";
import { Schema } from "mongoose";  
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : [true,"username is madatory"],
            lowercase : true,
            unique : true,
            index: true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase: true,
            trim : true
        },
        password : {
            type :String,
            required : true,
            unique: false,
            trim : true,
            minlength : 6
        }


    }
);

UserSchema.pre("save",async function(next){

    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,20);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateAccessToken = function(){
    const accesstoken = jwt.sign(
        {
            username: this.username,
            email: this.email,
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY;
        }
    )
    return accesstoken;
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY;
        }
    )
}


export const User = mongoose.model('User',UserSchema);