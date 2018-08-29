const express = require('express');
const hbs= require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.port || 3000;


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now= new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('log.txt',log + '\n');
    next();
});



// app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('scream', (text)=>{
    return text.toUpperCase();
});

hbs.registerHelper('getcurrentyear',()=>{
    return new Date().getFullYear()

});


app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my homepage',
        
    });
});



app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        Title:'Error',
        message:'Err page!'});
});

app.listen(port,()=>{
console.log(`server is up on port ${port}`)
});