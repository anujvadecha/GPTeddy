import { apiService } from './api.service.js'

const base_url = 'http://localhost:8000'
// const base_websocket_url = 'admin.starskillgame.com'
// const base_url = 'http://localhost:9000'
// const base_websocket_url = 'localhost:9000'
//

function loginAdminUser () {
    var user = {
        "username": "admin",
        "password": "admin"
    }
    const endpoint = base_url + '/api/token/'
    return apiService(endpoint, 'POST', user)
}

function createAvailability(data){
    const endpoint = base_url + '/reservation/create_availability/'
    return apiService(endpoint, 'POST', data)
}

function createReservation(data){
    const endpoint = base_url + '/reservation/reserve/'
    return apiService(endpoint, 'POST', data)
}

function getReservations(data){
    const endpoint = base_url + '/reservation/reservations'
    return apiService(endpoint, 'GET', data)
}

function getOrganizations(){
    const endpoint = base_url + '/user/organizations/organization-list'
    return apiService(endpoint, 'GET', null)
}
function getResources(data){
    const endpoint = base_url + '/resources/resource-list-organization'
    return apiService(endpoint, 'GET', data)
}
function addParticipants(data){

}

function get_tickets_for_user () {
    const endpoint = base_url + '/gamemaster/tickets'
    return apiService(endpoint, 'GET',null)
}


export {
//   base_url,
//   place_order,
//   get_tickets_for_user,
    loginAdminUser,
    createAvailability,
    createReservation,
    getReservations,
    getOrganizations,
    getResources
}
