
import axios from 'axios';

import { remoteUrl } from "./remoteUrl"
const URI = remoteUrl || 'http://192.168.0.73:5000'

const postLogin = async (userData) => {
  try {
    const res = await axios.post(`${URI}/api/v1/login`, userData)
    return res
  } catch (error) {
    return error
  }
}

export {postLogin}