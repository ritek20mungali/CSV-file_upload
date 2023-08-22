const express =require("express");
const app=express();

const bodyParser =require('body-parser');

const expressLayouts = require('express-ejs-layouts');
const csv = require('csv-parser');

const db=require('./config/db')

// setting layouts
app.use(expressLayouts);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//accesing static files from assets folder
app.use(express.static('./assets'));    


app.set('view engine','ejs');
app.set('views',"./views");

app.use('/',require('./routes/index'));


app.listen(5000,()=>{
    console.log("server is being set on port 5000")
})