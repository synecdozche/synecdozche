import '../main.css'
import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import DiscordContext from '../components/DiscordContext'
import axios from 'axios'

class MyApp extends App {

    state = {
        user: null
    }

    componentDidMount = () => {
        const user = localStorage.getItem('discord-user')
        if (user) {
            const parsedUser = JSON.parse(user)
            this.setState({
                user: parsedUser
            })
        } else {
            Router.push('/login')
        }
    }

    signIn = async (code) => {
        const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
        const res = await axios({
          method: 'post',
          baseURL: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}`,
          headers: {
            Authorization: `Basic ${creds}`
          }
         })
        
        const user = res.data
         
        localStorage.setItem('discord-user', JSON.stringify(user))

        this.setState({
            user
        },
        () => {
            Router.push('/')
        })
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <DiscordContext.Provider value={{ user: this.state.user, signIn: this.signIn }}>
                <Component {...pageProps} />
            </DiscordContext.Provider>
        )
    }
}

export default MyApp