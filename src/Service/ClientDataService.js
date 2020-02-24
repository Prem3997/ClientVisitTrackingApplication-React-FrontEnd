import axios from 'axios';
const CLIENT_API_URL="http://localhost:8080/ClientTrackingApplication/client"
class ClientDataService{
    addClient(client){
        return axios.post(`${CLIENT_API_URL}`,client)
    }
    getAllClients(){
        return axios.get(`${CLIENT_API_URL}`)
    }
    deleteClientDetails(clientIdToDelete){
        return axios.delete(`${CLIENT_API_URL}/${clientIdToDelete}/`)

    }
    editClientDetails(client){
        return axios.put(`${CLIENT_API_URL}`,client)
    }
    getClientById(clientId){
        return axios.get(`${CLIENT_API_URL}/${clientId}/`)
    }
}
export default new ClientDataService()