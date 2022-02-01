const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    nickName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    todo: { type: {}, required: false },
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, 'shhhhh');
    return token;
}

const User = mongoose.model("User", userSchema)

const complexityOptions = {
    min: 4,
    max: 26,
    lowerCase: 1,
    upperCase: 0,
    numeric: 1,
    symbol: 0,
    requirementCount: 4,
};

const validate = (data) => {
    const schema = Joi.object({
        nickName: Joi.string().required().label("Nick Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity(complexityOptions).required().label("Password"),
        todo: Joi.allow('').optional().label("Todo"),
    })
    return schema.validate(data)
}

module.exports = { User, validate }
