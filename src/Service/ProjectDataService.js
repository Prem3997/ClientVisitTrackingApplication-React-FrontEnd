import axios from 'axios';
const PROJECT_API_URL="http://localhost:8080/ClientTrackingApplication/project"
class ProjectDataService{
    addProject(project){
        return axios.post(`${PROJECT_API_URL}`,project)
    }
    viewProjectDetails(){
        return axios.get(`${PROJECT_API_URL}`)
    }
    editProjectDetails(project){
        return axios.put(`${PROJECT_API_URL}`,project)
    }
    deleteProjectDetails(projectIdTodelete){
        return axios.delete(`${PROJECT_API_URL}/${projectIdTodelete}/`)
    }
    getProjectById(projectId){
        return axios.get(`${PROJECT_API_URL}/${projectId}/`)
    }
}
export default new ProjectDataService()