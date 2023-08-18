
import axios from 'axios';

const remoteURL = 'https://ksprojects.pl/store-app/'
const url = 'http://192.168.0.73:5000/'

const postLogin = async (userData) => {
  try {
    const res = await axios.post(`${remoteURL}api/v1/login`, userData)
    return res
  } catch (error) {
    return error
  }
}

export {postLogin}