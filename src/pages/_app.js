import '../main.css'
import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import DiscordContext from '../components/DiscordContext'

class MyApp extends App {

    state = {
        user: null
    }

    componentDidMount = () => {
        const user = localStorage.getItem('discord-user')
        if (user) {
            this.setState({
                user
            })
        } else {
            Router.push('/login')
        }
    }


    render() {
        const { Component, pageProps } = this.props

        return (
            <DiscordContext.Provider value={{ user: this.state.user }}>
                <Component {...pageProps} />
            </DiscordContext.Provider>
        )
    }
}

export default MyApp