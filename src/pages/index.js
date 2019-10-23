import Link from "next/link";
import axios from "axios";
import DiscordContext from '../components/DiscordContext'
import { useContext } from 'react'

const Index = ({ name }) => {
    const { user } = useContext(DiscordContext)

    return (
        <div className="bg-gray-500">
            <Link href="/about" >
                <a title="about page">About Page</a>
            </Link>
            <Link href="/login" >
                <a title="login">login page</a>
            </Link>
            <p className="text-2xl text-red-500">Hello world { name } and { user } </p>
        </div>
    )
};

Index.getInitialProps = async () => {
    const res = await axios.get('http://localhost:3000/api/test');
    const { data } = res;

    return data
}

export default Index