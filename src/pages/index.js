import Link from "next/link";
import Api from "../components/DiscordApi";
import DiscordContext from '../components/DiscordContext';
import { useContext, useState, useEffect }  from 'react';

const Index = () => {
    const { user, signOut } = useContext(DiscordContext)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            if (user !== null) {
                const res = await Api(user.access_token).get('/users/@me')
                setUserData(res.data)
            }
        }
        fetchData();
    }, [user])

    if (userData === null) 
        return <h1>loading...</h1>

    return (
    <>
        <nav className="flex p-1">
            <Link href="/about">
                <a className="mr-2 font-mono text-white" title="about page">About</a>
            </Link>
            <span className="font-mono mr-2 text-orange-500">/</span>
            <Link href="/login">
                <a className="font-mono mr-2 text-purple-500" title="login">Login</a>
            </Link>
            <span className="font-mono mr-2 text-green-200">/</span>
            <a className="font-mono cursor-pointer text-indigo-300" onClick={() => signOut()}>Logout</a>
        </nav>

        <article className="">
            <div className="h-30 bg-gray-800 flex justify-center max-w-xs mx-auto p-2 mt-40 rounded-lg">
                <img className="h-20 w-20 rounded-full" src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`} />
                <h2 className="ml-2 self-center font-mono font-bold text-2xl text-white">Hello, {userData.username}#{userData.discriminator}</h2>
            </div>
        </article>
    </>
    )
};


export default Index