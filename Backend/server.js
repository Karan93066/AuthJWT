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
app.use(cors());
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


app.listen(4200,()=>{
    console.log(`express server running on 4200`);
});