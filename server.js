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

process.env.API_URL = process.env.NODE_ENV == 'production' ? "https://experis-football-manager-back.herokuapp.com" : "http://localhost:5000";


const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

const handle = app.getRequestHandler();

app.prepare()

    .then(() => {
        const server = express();
        server.use(cookieParser());
        server.use(bodyParser.json());

        server.get("/test",(req,res)=>{
            console.log(req.headers);
            console.log(req.cookies);
        })

        server.get("/",(req,res)=>{
            if(req.cookies.role=="admin"){
                res.redirect('/admin')
            }else if(req.cookies.role=="user"){
                res.redirect('/dashboard')
            }else {
                return handle(req, res);
            }

        })

        server.use('/admin', (req, res, next) => {
            console.log(req.cookies.token);
            console.log(req.headers);
            try {
                const decode = jwt.verify(req.cookies.token, Buffer.from("secretAdmin").toString('base64'), {algorithms: ['HS512']});
                if(req.cookies.role=="admin"){
                    next();
                }else if(req.cookies.role=="user"){
                    res.redirect('/dashboard')
                }else {
                    res.redirect('/')
                }


            } catch (error) {
                console.log(error);
                res.redirect('/')
            }


        });
        server.use('/dashboard', (req, res, next) => {
            console.log("Checking authentication for User");

            try {
                const decode = jwt.verify(req.cookies.token, Buffer.from("secretAdmin").toString('base64'), {algorithms: ['HS512']});
                if(req.cookies.role=="user"){
                    next();
                }else if(req.cookies.role=="admin"){
                    res.redirect('/admin')
                }else {
                    res.redirect('/')
                }


            } catch (error) {

                res.redirect('/')
            }


        });
        // Authenticate middleware
        server.get('/logout', (req, res) => {
            res.clearCookie("token");
            res.clearCookie("id");
            res.clearCookie("role");
            res.clearCookie("userName");
            res.redirect('/');
        })
        server.post('/login', (req, res) => {
            console.log('User wishes to login as Admin');

            let url = process.env.API_URL + "/api/auth/signin";
            console.log(req.body);

            const options = {
                method: 'POST',
                uri: url,
                json: true, // Automatically stringifies the body to JSON
                resolveWithFullResponse: true,
                body: req.body,
                headers: {
                    'content-type': "application/json"
                },
                simple: false
            };

            request(options).then(response => {

                if (response.statusCode == 200) {
                    //res.cookie("token", response.body.accessToken, {maxAge: 1000 * 60 * 60 * 4, httpOnly: true, domain:process.env.API_URL});
                    res.cookie("token", response.body.accessToken, {maxAge: 1000 * 60 * 60 * 4, httpOnly: true,sameSite:"lax"});
                    res.cookie("id",response.headers.id,{maxAge: 1000 * 60 * 60 * 4, httpOnly: false})
                    res.cookie("role",response.headers.role,{maxAge: 1000 * 60 * 60 * 4, httpOnly: true})
                    res.cookie("userName",req.body.userName,{maxAge: 1000 * 60 * 60 * 4, httpOnly: false})



                    console.log(response.cookies);
                    res.status(200).send({
                        token: response.body.accessToken,
                        role: response.headers.role
                    })
                } else if (response.statusCode == 401) {
                    res.status(401).end();
                }


            }).catch((err) => {
                console.log(err);
            });


        });
        server.get('*', (req, res) => {


            return handle(req, res);
        });
        server.listen(port, (err) => {
            console.log(process.env.NODE_ENV);
            console.log(">" + port)
            if (err) throw err

        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
