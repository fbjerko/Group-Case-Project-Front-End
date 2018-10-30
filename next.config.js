// next.config.js
const withCSS = require('@zeit/next-css')
const { parsed: production } = require('dotenv').config("/production.env")
const webpack = require('webpack')

module.exports = {
    webpack(config) {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.API_URL': "'https://experis-football-manager-back.herokuapp.com'",
            'process.env.FRONT_END_URL': "'https://experis-fotball-manager.herokuapp.com'"
        }));


        return config
    },
    withCSS
}


