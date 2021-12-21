const express=require('express')
const router=express.Router();
const {catchAsync}=require('../utilities/catchAsync')

const User=require('../models/user');
const passport = require('passport');


router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',catchAsync(async (req,res)=>{
    try{
        const {email, username, password}=req.body;
        const user=new User({email,username})
        const registeredUser= await User.register(user,password);
        res.send('registered successfully')
    }catch(e){
        res.redirect('/register')
    }
}))

router.get('/login',async(req,res)=>{
    res.render('login')
})

router.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
    res.send('logged in successfully')
})


router.get('/logout',(req,res)=>{
    req.logout();
    res.send('Successfully logged you out');
})

module.exports=router;