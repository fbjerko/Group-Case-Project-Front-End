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
            console.log("Checking authentication for Admin");

            try {
                const decode = jwt.verify(req.cookies.token, 'secretAdmin');
                next();
            } catch (error) {

                res.redirect('/')
            }


        });


        server.use('/dashboard', (req, res, next) => {
            console.log("Checking authentication for User");

            try {
                const decode = jwt.verify(req.cookies.token, 'secretNotAdmin');
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
                console.log(response.body);

            }).catch((err) => {
                console.log(err);
            });


        });


        server.post('/register', (req, res) => {
            let body = req.body;
            bcrypt.hash(body.password, 10, (err, hash) => {
                if (hash) {
                    body.password = hash;
                    let url = process.env.API_URL + "/api/user";

                    const options = {
                        method: 'POST',
                        uri: url,
                        body: body,
                        json: true, // Automatically stringifies the body to JSON
                        resolveWithFullResponse: true,
                        headers: {
                            'content-type': "application/json"
                        },
                        simple: false
                    };

                    request(options).then(response => {
                        //console.log(response.status);
                        if (response.statusCode == 201) {
                            res.status(201).json({
                                message: "Created"
                            });
                        } else {
                            res.status(401).json({
                                message: "Failed"
                            });
                        }

                    }).catch((err) => {
                        console.log(err);

                    });
                } else {
                    console.log(err);
                    res.status(401).json({
                        message: "Failed"
                    });
                }

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
