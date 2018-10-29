const next = require('next');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const http = require('http');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const request = require('request-promise');




// initialize the Next.js application
const app = next({
  dev: process.env.NODE_ENV !== "production"
});

const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();
  
  //server.use('/',routes);
  server.use(cookieParser());
  server.use(bodyParser.json());

  server.use('/admin',(req,res,next)=>{
    console.log("Checking authentication for Admin");
    console.log(req.cookies.token);
    try{
      const decode = jwt.verify(req.cookies.token,'secretAdmin');
      next();
    }catch(error){
    	
      res.status(401).end();
    }
    
    
    
  });

  server.use('/dashboard',(req,res,next)=>{
    console.log("Checking authentication for User");
    console.log(req.cookies.token);
    try{
      const decode = jwt.verify(req.cookies.token,'secretNotAdmin');
      next();
    }catch(error){
    	
      res.status(401).end();
    }
    
    
    
  });

  server.post('/login',(req,res)=> {
      console.log('User whishes to login as Admin');
      console.log(req.body.password);
      console.log(req.body.email);



    let url = "http://localhost:5000/api/user/findByEmail/"+req.body.email;
    http.get(url,(response)=>{
      let data = '';
        // A chunk of data has been recieved.
          response.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          response.on('end', () => {
          	let user = JSON.parse(data);
            
            bcrypt.compare(req.body.password,user.password,(err,hashResponse)=>{
            	if(hashResponse){
            		if(user.admin==false){
			              const JWTToken = jwt.sign({
			                  email: user.email,
			                  id: user.id,
			                  admin : false

			                },
			                'secretNotAdmin',
			                 {
			                   expiresIn: '2h'
			                 });
			              res.cookie('token',JWTToken,{maxAge:2 * 60 * 60 * 1000,httpOnly:true});
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
			                'secretAdmin',
			                 {
			                   expiresIn: '2h'
			                 });
			              res.cookie('token',JWTToken,{maxAge:2 * 60 * 60 * 1000,httpOnly:true})
			              res.status(200).json({
			                message: "admin",
			              });
			            }
            	}else{

            	}
            })
          });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

  });

  server.post('/register',(req,res)=>{
  	let body = req.body;
  	bcrypt.hash(body.password,10,(err,hash)=>{
  		if(hash){
  			body.password = hash;
  			console.log(hash);
  			let url = "http://localhost:5000/api/user";

            const options = {
                method: 'POST',
                uri: url,
                body: body,
                json: true, // Automatically stringifies the body to JSON
                resolveWithFullResponse: true,
                headers:{
                    'content-type':"application/json"
                }
            };

		  	request(options).then(response=>{
		  	    //console.log(response.status);
                res.status(200);
            }).catch((err)=>{
                console.log("Error!!!-----------------------------------------");
                console.log(err);
                res.status(401);
            });
  		}else{
  			console.log(err);
  			res.status(401);
  		}
  		
  	});

  	
  	
  	
  });
  
  server.get('*', (req, res) => {
    return handle(req, res);
  });




    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000');
      console.log(process.env.NODE_ENV);
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
