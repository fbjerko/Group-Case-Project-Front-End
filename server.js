const next = require('next');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const http = require('https');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const request = require('request-promise');
process.env.API_URL= process.env.NODE_ENV == 'production'?"https://experis-football-manager-back.herokuapp.com":"http://localhost:5000";




const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();
  

  server.use(cookieParser());
  server.use(bodyParser.json());



  server.use('/admin',(req,res,next)=>{
    console.log("Checking authentication for Admin");

    try{
    const decode = jwt.verify(req.cookies.token,'secretAdmin');
      next();
    }catch(error){
    	
      res.redirect('/')
    }
    
    
    
  });



  server.use('/dashboard',(req,res,next)=>{
    console.log("Checking authentication for User");

    try{
    const decode = jwt.verify(req.cookies.token,'secretNotAdmin');
      next();
    }catch(error){

        res.redirect('/')
    }
    
    
    
  });

    // Authenticate middleware
    // We will apply this middleware to every route except '/login' and '/_next'

server.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.clearCookie("id");
    res.redirect('/');
})
server.post('/login',(req,res)=> {
      console.log('User whishes to login as Admin');
      console.log(req.body.password);
      console.log(req.body.email);
      let url = process.env.API_URL+"/api/user/findByEmail/"+req.body.email;

      const options = {
          method: 'GET',
          uri: url,
          json: true, // Automatically stringifies the body to JSON
          resolveWithFullResponse: true,
          headers:{
              'content-type':"application/json"
          },
          simple: false
      };
    console.log(url);
      request(options).then(response=>{
          if(response.statusCode==200){
              console.log("User exists");
              let user = response.body;

              bcrypt.compare(req.body.password,user.password,(err,hashResponse)=>{
                  if(hashResponse){
                      if(user.admin==false){
                          const JWTToken = jwt.sign({
                                  email: user.email,
                                  id: user.userId,
                                  admin : false

                              },
                              'secretNotAdmin',
                              {
                                  expiresIn: '2h'
                              });
                          res.cookie('token',JWTToken,{maxAge:2 * 60 * 60 * 1000,httpOnly:true});
                          res.cookie('id',user.userId,{maxAge:2 * 60 * 60 * 1000,httpOnly:false});
                          res.status(200).json({
                              message: "user",
                              token: JWTToken

                          });
                      }else if(user.admin==true){
                          const JWTToken = jwt.sign({
                                  email: user.email,
                                  id: user.userId,
                                  admin : true

                              },
                              'secretAdmin',
                              {
                                  expiresIn: '2h'
                              });
                          console.log(user);
                          res.cookie('token',JWTToken,{maxAge:2 * 60 * 60 * 1000,httpOnly:true});
                          res.cookie('id',user.userId,{maxAge:2 * 60 * 60 * 1000,httpOnly:false});
                          res.status(200).json({
                              message: "admin",
                          });
                      }
                  }else{
                      res.status(401).end();
                  }
              })
          }else{
              console.log("User Not exists");
              res.status(401).json({
                  message:"failed"
              });
          }

      }).catch((err)=>{
          console.log(err);
      });



  });
server.get('/',(req,res)=>{
    try{
        const decode = jwt.verify(req.cookies.token,'secretNotAdmin');
        res.redirect('/dashboard')
    }catch(error){
        try{
            const decode = jwt.verify(req.cookies.token,'secretAdmin');
            res.redirect('/admin')
        }catch(error){
            return handle(req, res);
        }
    }
})

  server.post('/register',(req,res)=>{
  	let body = req.body;
  	bcrypt.hash(body.password,10,(err,hash)=>{
  		if(hash){
  			body.password = hash;
  			let url = process.env.API_URL+"/api/user";

            const options = {
                method: 'POST',
                uri: url,
                body: body,
                json: true, // Automatically stringifies the body to JSON
                resolveWithFullResponse: true,
                headers:{
                    'content-type':"application/json"
                },
                simple:false
            };

		  	request(options).then(response=>{
		  	    //console.log(response.status);
                if(response.statusCode==201){
                    res.status(201).json({
                        message:"Created"
                    });
                }else{
                    res.status(401).json({
                        message:"Failed"
                    });
                }

            }).catch((err)=>{
                console.log(err);

            });
  		}else{
  			console.log(err);
  			res.status(401).json({
                message:"Failed"
            });
  		}
  		
  	});

  	
  	
  	
  });

  server.get('*', (req, res) => {


    return handle(req, res);
  });




    
  server.listen(port, (err) => {
      console.log(process.env.NODE_ENV);
      console.log(">"+port)
    if (err) throw err

  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
