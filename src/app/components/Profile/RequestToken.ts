import axios from "axios" 
import config from '../../../../config/config.json'

const RequestAuthToken = async () => {
  try {
    let result = await axios.post(`${config.API_URL}/api/epay/auth/token`, {
      
    })
    console.log(result.data)
    return result.data.data
  } catch (e) {
    console.log(e)
    return null
  }
  
}

export {RequestAuthToken}