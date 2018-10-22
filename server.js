const next = require('next');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


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
    next();
    
  });

  server.get('/admin',(req,res)=>{
    console.log('User granted access!');
    return handle(req,res);
  });

  server.post('/login',(req,res)=>{
    console.log('User whishes to login as Admin');
    console.log(req.body.password);
    console.log(req.body.email);
    res.status(400);
    res.send('OK');
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

