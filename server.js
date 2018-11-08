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


        server.use('/admin', (req, res, next) => {
            console.log(jwt.decode(req.cookies.token));

            try {
                const decode = jwt.verify(req.cookies.token, Buffer.from("secretAdmin").toString('base64'),{ algorithms: ['HS512'] });
                console.log(decode);
                next();
            } catch (error) {
                console.log(error);
                res.redirect('/')
            }


        });


        server.use('/dashboard', (req, res, next) => {
            console.log("Checking authentication for User");

            try {
                const decode = jwt.verify(req.cookies.token, Buffer.from("secretAdmin").toString('base64'),{ algorithms: ['HS512'] });
                next();
            } catch (error) {

                res.redirect('/')
            }


        });

        // Authenticate middleware




        server.get('/logout', (req, res) => {
            res.clearCookie("token");
            res.clearCookie("id");
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
                console.log();
                if(response.statusCode==200){
                    res.cookie("token",response.body.accessToken,{ maxAge: 1000*60*60*4, httpOnly: true });
                    res.status(200).send({
                        token: response.body.tokenType+ " "+response.body.accessToken,
                        role: response.headers.role
                    })
                }else if(response.statusCode==401){
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
