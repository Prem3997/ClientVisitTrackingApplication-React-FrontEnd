import axios from 'axios';
const CLIENTVISIT_API_URL="http://localhost:8080/ClientTrackingApplication/clientvisit"
class UserDataService{
    getUpComingVisit(){
        return axios.get(`${CLIENTVISIT_API_URL}/upcomingVisits/`)
    }
}
export default new UserDataService()