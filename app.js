const express = require('express');
const path = require('path');
var cors = require("cors");
const route = require('./routes');
const PORT = process.env.PORT | 3000


const app = express();
var moment = require('moment');

app.use(cors());
app.use(express({ limit: "100mb",parameterLimit:1000000,extended:true, }));
app.use(express.urlencoded({limit:"100mb"}));
app.use(express.json({limit: "100mb"}));


app.use('/api/routes', route)



//app.set('views', __dirname + '/views');
app.set('views', path.join(process.cwd(), '/views'));

app.engine('html', require('ejs').renderFile);

//app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');



app.use('/',express.static(path.join(__dirname,'www')));
app.use((req,res,next)=>{
  console.log(req.path)
  res.sendFile(__dirname + '/www/index.html', {moment: moment});
})

app.use((req,res,next)=>{
    console.log(req.path);
    res.status(404).send('<h1>Page not found </h1>');
})

app.listen(PORT,()=>{
  console.log("Main Server listening on " +PORT)
});