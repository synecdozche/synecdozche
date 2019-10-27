
import { useEffect, useState } from 'react';
import DuolingoApi from './DuolingoApi';

const DuolingoCard = () => {
    const [duoName, setDuoName] = useState('')
    const [duoData, setDuoData] = useState('')
    const [editName, allowEdit] = useState(false)

    useEffect(() => {
        async function fetchDuo() {
            console.log(duoName)
            if (duoName !== "" && !editName) {
                try {
                    const res = await DuolingoApi(duoName).get()
                    console.log(res);
                    console.log(res.data.users[0]);
                    setDuoData(res.data.users[0])
                } catch(err) {
                    console.log(err);
                }

            }
        }
        fetchDuo();
    }, [duoName, editName])    
    
    return (
        <section className="w-48 rounded-lg m-4 bg-green-600">
            <div className="flex flex-1">
            <h2 className="ml-4 self-center px-4 font-mono font-bold text-lg text-white w-64">Duolingo</h2>
                {editName ? (
                <a className='m-2 text-white border border-black bg-green-300 p-1 rounded-lg' onClick={() => allowEdit(false)}> ✔</a>
                ) : (
                <a className='m-2 text-white border border-black bg-blue-500 p-1 rounded-lg' onClick={() => allowEdit(true)}> edit </a>
                )}
            </div>

            { editName ? (
                <input placeholder="username" 
                    className="bg-white m-2 focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 w-40 appearance-none leading-normal"  
                    disabled={!editName} value={duoName} 
                    onChange={e => setDuoName(e.target.value)} 
                />
            ) : (
                <h2 className="bg-transparent m-2 py-2 px-4 text-md font-bold text-white">{duoName === '' ? "username" : duoName} </h2>
            )}

            {duoData &&
                <>
                    <p className=" mt-4 ml-2 font-mono text-white text-xl">Completed Today {duoData.streak_extended_today ? '✔' : '❌'}</p>
                    <p className="ml-2 font-mono text-gray-300 text-lg">Total XP: 3000</p>
                </>
            }
        </section>
    )
}

export default DuolingoCard;