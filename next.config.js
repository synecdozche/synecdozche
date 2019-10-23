require('dotenv').config()
const withCSS = require('@zeit/next-css')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = withCSS({
    webpack: config => {
        config.plugins = config.plugins || []

        config.plugins = [
            ...config.plugins,
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        ]
        return config
    }
})
