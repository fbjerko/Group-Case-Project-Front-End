// next.config.js
const withCSS = require('@zeit/next-css')
const { parsed: production } = require('dotenv').config("/production.env")
const webpack = require('webpack')

module.exports = {
    webpack(config) {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.API_URL': process.env.NODE_ENV=='production' ? "'https://experis-football-manager-back.herokuapp.com'":"'http://localhost:5000'",
            'process.env.FRONT_END_URL': process.env.NODE_ENV=='production' ?"'https://experis-fotball-manager.herokuapp.com'":"'http://localhost:3000'"
        }));


        return config
    },
    withCSS
}


