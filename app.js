if(process.env.NODE_ENV !=="production")
{
    require('dotenv').config();
}


const express=require('express')
const path=require('path')
const mongoose=require('mongoose')
const session=require('express-session');
const app=express();
const ejsMate = require('ejs-mate')
const methodOverride=require('method-override')
const passport=require('passport');
const LocalStrategy=require('passport-local')
const User=require('./models/user')
const userRoutes=require('./routes/user')
const dotenv=require('dotenv').config()
const taskRoutes=require('./routes/taskRoutes')
const dbUrl=process.env.DB_URL || 'mongodb://localhost:27017/Auth1';

mongoose.connect(dbUrl);
const db=mongoose.connection;
db.on('error',console.error.bind(console,"connection error"));
db.once('open',()=>{
    console.log("Database connected");
})

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: "thisisnotagudsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        HttpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/',taskRoutes)
app.use('/',userRoutes)

app.all('*', (req, res, next) => {
    res.redirect('/tasks')
})

app.listen(3000, () => {
    console.log('SERVING TO PORT 3000!')
})