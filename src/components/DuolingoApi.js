import axios from 'axios';

const ApiInstance = (username) => {

    return axios.create({
        baseURL: `https://www.duolingo.com/api/1/users/show?username=${username}`,
    });
}

export default ApiInstance;