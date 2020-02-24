import axios from 'axios';
const CLIENTVISIT_API_URL="http://localhost:8080/ClientTrackingApplication/clientvisit"
class ClientVisitDataService{

    viewCancelledVisits(){
        return axios.get(`${CLIENTVISIT_API_URL}/cancelled/`)
    }
    getClientVisits(){
        return axios.get(`${CLIENTVISIT_API_URL}`)
    }
    deleteClientVisits(visitId){
        return axios.delete(`${CLIENTVISIT_API_URL}/${visitId}/`)
    }
    addClientVisit(clientvisit){
        return axios.post(`${CLIENTVISIT_API_URL}/${clientvisit.clientId}/`,clientvisit)
    }
    addProjectForVisit(visitId,projectIdToAdd){
        return axios.post(`${CLIENTVISIT_API_URL}/addproject/${visitId}/${projectIdToAdd}/`)
    }
    getClientVisitdetail(visitId){
        return axios.get(`${CLIENTVISIT_API_URL}/${visitId}/`)
    }
    editClientVisitDetail(visit){
        return axios.put(`${CLIENTVISIT_API_URL}`,visit)
    }
    viewCompletedVisits(){
        return axios.get(`${CLIENTVISIT_API_URL}/completedvisits/`)
    }

}
export default new ClientVisitDataService()