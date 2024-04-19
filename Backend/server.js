const express=require("express");
const path=require("path");
const cors=require("cors");
const app=express();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const { log } = require("console");
const salt = 10;
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin:["http://localhost:5173"],
  methods: ["GET","POST"],
  credentials: true
}));
app.use(cookieParser());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth'
});

connection.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
const verifyUser = (req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.json({Error :"You are Not authenticated"})
  } else{
    jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
      if(err){
    return res.json({Error :"Token is not okie"})

      }else{
        req.name = decoded.name;
        next();
      }
    })
  }
}
  app.get('/',verifyUser,(req,res)=>{
        return res.json({Status:"Success",name:req.name})
  })
  app.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    var password = req.body.password;

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error in Hashing Password" });

        // Now password is hashed
        password = hash;

        // Inside the callback of bcrypt.hash
        const query = 'INSERT INTO login(name, email, password) VALUES("'+name+'", "'+email+'", "'+password+'")';
        console.log(query);
        connection.query(query, [name, email, password], (err, result) => {
            if (err) return res.json({ Error: "Error inserting data into server" });
            return res.json({ Status: "success" });
        });
    });
});

app.post('/login',(req,res)=>{
  const email = req.body.email;
  const query = 'SELECT * FROM login WHERE email = "'+email+'"';
  connection.query(query, [email],(err,data)=>{
    if(err) return res.json({Error:"Login error in server"});
    if(data.length>0){
      bcrypt.compare(req.body.password.toString(), data[0].password,(err,response) =>{
      if(err) return res.json({Error:"Password Compare error"});
      if(response){
        const name = data[0].name;
        const token = jwt.sign({name},"jwt-secret-key",{expiresIn:'1d'});
        res.cookie('token',token);
        res.cookie('token', token);
console.log("Token set in cookie:", token);

        return res.json({ Status: "Success" });
      }
      else{
        return res.json({ Error: "Password not matched" });
      }

      })
     } else{
      return res.json({ Error: "No Email existed" });

      }
   
  })
})

app.get('/logout',(req,res) => {
      res.clearCookie('token');
      return res.json({Status:"Success"})
})
app.listen(4200,()=>{
    console.log(`express server running on 4200`);
});