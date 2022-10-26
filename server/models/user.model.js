const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userController = require("../controllers/user.controller");
const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:[true,"first name is required"],
            minlength:[3, "first name must be at least 5 characters long"]
        },
        lastName:{
            type:String, 
            required:[true,"last Name is required"],
            minlength:[3, "last name must be at least 5 characters long"]
        },
        userName:{
            type:String,
            required:[true,"user name is required"],
            minlength:[5, "username must be at least 5 characters long"],
            maxlength:[30, "username cannot be longer than 15 characters"],
            unique: [true, "username must be unique"]
        },
        email:{
            type: String,
            required: [true, "email is required"],
            validate:{
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "please enter a valid email"
            }
        },
        password:{
            type: String,
            required: [true, "password is required"],
            minlength: [8, "passwrod must be at least 8 characters long"]
        },
        following:{
            type: Array
        },
        followers:{
            type: Array
        },
        likedPosts:{
            type:Array
        }
    },{timestamps: true}
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => {
        this._confirmPassword = value;
    })

    UserSchema.pre("validate", function (next){
        if(this.password !== this.confirmPassword){
            this.invalidate("confirmPassword", "passwords must match")
        }
        next();
    })

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("error saving hash")
            console.log(err)
        })

})
module.exports = mongoose.model("User", UserSchema);