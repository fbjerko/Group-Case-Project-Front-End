const next = require('next');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const http = require('http');
const jwt = require('jsonwebtoken');


// initialize the Next.js application
const app = next({
  dev: process.env.NODE_ENV !== "production"
});

const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();
  
  //server.use('/',routes);
  server.use(bodyParser.json());
  server.use('/admin',(req,res,next)=>{
    console.log("Checking authentication");
    console.log(req);
    try{
      const decode = jwt.verify(req.body.token,process.env.JWT_KEY);
      next();
    }catch(error){
      res.status(401).end();
    }
    
    
    
  });

  server.get('/admin',(req,res)=>{
    console.log('User granted access!');
    return handle(req,res);
  });

  server.post('/login',(req,res)=>{
    console.log('User whishes to login as Admin');
    console.log(req.body.password);
    console.log(req.body.email);

    let url = "http://localhost:5000/api/user/findbyemail/"+req.body.email;
    http.get(url,(response)=>{
      let data = '';
        // A chunk of data has been recieved.
          response.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          response.on('end', () => {
            let users = JSON.parse(data);
            let user = users[1];
            console.log(user.admin);

            if(user.admin==false){
              const JWTToken = jwt.sign({
                  email: user.email,
                  id: user.id,
                  admin : false

                },
                'secret',
                 {
                   expiresIn: '2h'
                 });
              res.status(200).json({
                message: "user",
                token: JWTToken

              });
            }else if(user.admin==true){
              const JWTToken = jwt.sign({
                  email: user.email,
                  id: user.id,
                  admin : true

                },
                'secret',
                 {
                   expiresIn: '2h'
                 });
              res.status(200).json({
                message: "admin",
                token: JWTToken
              });
            }


          });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    //If user doesn't exist or password is wrong
    
    //If login is user
    //res.status(200);
    // If user is admin

  });
  
  server.get('*', (req, res) => {
    return handle(req, res);
  });




    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000');
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});

