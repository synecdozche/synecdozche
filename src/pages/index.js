import Link from "next/link";
import Api from "../components/DiscordApi";
import DiscordContext from '../components/DiscordContext';
import DuolingoCard from '../components/DuolingoCard';
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

        <main className="max-w-3xl mt-24 mx-auto flex flex-center">
            <section className=" h-24 bg-gray-800 flex m-4 flex-initial w-64 justify-center p-2 rounded-lg">
                <img className="h-20 w-20 rounded-full" src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`} />
                <h2 className="ml-2 self-center font-mono font-bold text-xl text-white">Hello, {userData.username}#{userData.discriminator}</h2>
            </section>
            <DuolingoCard />
        </main>
    </>
    )
};


export default Index