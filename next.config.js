require('dotenv').config()
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
      env: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        REDIRECT_DEV: process.env.REDIRECT_DEV,
        REDIRECT_PROD: process.env.REDIRECT_PROD
      }
})
