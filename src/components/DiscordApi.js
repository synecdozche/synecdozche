import axios from 'axios';

const ApiInstance = (access_token) => {

    return axios.create({
    baseURL: 'https://discordapp.com/api/',
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
}

export default ApiInstance;