var express                  =  require('express');
    app                      =  express();
    passport                 =  require('passport');
    bodyparser               =  require('body-parser');
    LocalStrategy            =  require('passport-local');
    passportLocalMongoose    =  require('passport-local-mongoose');
    mongoose                 =  require('mongoose');
    User                     =  require('./models/user');
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"Rusty is the best and cutest dog in the world",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));




//==========
//ROUTES
//======

app.get('/',function (req,res) {
res.render("home");
})
app.get('/secret',isLoggedIn,function (req,res) {
    //add islogged in function as middleware so that secret page is accessed only if
    //usr is logged in and not directly through url
    //befor rendering secret isLogged in is called and upon calling
    //it if it returns next then only next function is called to render secret page
    res.render("secret");

})


//AUTH ROUTES




//showing signup form
app.get('/register',function (req,res) {
    res.render("register");

} )
//handling user signup
app.post('/register',function (req,res) {
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username}),req.body.password,function (err,use) {
    if(err){
        console.log(err);
        res.render('register')
    }
    //Now following line logs the user in
        //  OR in future passport.authenticate("twitter")(req,res,function () {

            passport.authenticate("local")(req,res,function () {
        res.redirect('/secret');

    })
    });

    

})

//LOGIN ROUTES
// render login form
app.get("/login",function (req,res) {
    res.render('login');

})
//login logic
//middleware
app.post('/login', passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}) ,function (req,res) {
});
app.get('/logout',function (req,res) {
    req.logout();
    res.redirect('/');
    
})
//Adding a fn so that we cannot access secret page directly through url

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');

}
app.listen('1212',function (err,res) {
    if(err)
        console.log(err);
    else
        console.log("server started on port 1212");
})
