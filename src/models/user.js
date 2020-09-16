const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    email: {
        type: "String",
        required: true,
        unique: true
    },
    password: {
        type: "String",
        required: true
    }
})

userSchema.pre("save", function(next) {
    const user = this;
    const saltRounds = 10;
    const password = user.password;
    if( !user.isModified('password') ){
        return next();
    }
    bcrypt.genSalt(saltRounds, (err,salt) => {
        if(err){
            return next();
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if(err){
                return next();
            }
            user.password = hash;
            return next();
        } )
    })
})

userSchema.methods.generateAuthToken = function(){
    const user = this;
    const token = jwt.sign({userId: user._id}, "MY_SECRET");
    return token;
}

userSchema.methods.comparePassword = function( password ){
    return new Promise( (resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if(err){
                return reject(err)
            }
            if( isMatch){
                resolve(true);
            }else{
                reject("invalid email or password.");
            }
        })
    });
}

const User = mongoose.model("User", userSchema)

module.exports = User;