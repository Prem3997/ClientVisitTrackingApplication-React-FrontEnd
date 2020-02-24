import axios from 'axios';
const USER_API_URL="http://localhost:8080/ClientTrackingApplication/user"
class UserDataService{
    isValidUser(userName,password){
        return axios.get(`${USER_API_URL}/${userName}/${password}/`)
    }
    addUser(user){
        return axios.post(`${USER_API_URL}`,user)
    }
}
export default new UserDataService()