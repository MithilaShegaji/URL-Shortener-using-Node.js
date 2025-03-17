const {v4: uuidv4} = require('uuid'); 
const {setUser} = require("../service/auth");
const User = require("../models/user");
const URL = require("../models/url");


async function handleUserSignUp(req,res){
    const { username, email, password } = req.body;
    await User.create({
        username,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user = await User.findOne({email,password});
    // console.log("User",user);
    if(!user) return res.render("login", {
            error: "Invalid username or password",
        });
    // const sessionId = uuidv4(); not required anymore
    const token = setUser(user);
    // res.cookie("uid",token,{ httpOnly: true });
    // console.log(sessionId);
    // return res.redirect("/");   
    res.cookie("token",token,{ httpOnly: true });
    return res.redirect("/");   
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
}