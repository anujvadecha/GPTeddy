import { apiService } from './api.service.js'

const base_url = 'https://ceb6-131-179-58-112.ngrok.io'
// const base_websocket_url = 'admin.starskillgame.com'
// const base_url = 'http://localhost:9000'
// const base_websocket_url = 'localhost:9000'
//

function loginAdminUser() {
    var user = {
        "username": "admin",
        "password": "admin"
    }
    const endpoint = base_url + '/api/token/'
    return apiService(endpoint, 'POST', user)
}

export {
    //   base_url,
    //   place_order,
    //   get_tickets_for_user,
    loginAdminUser,
}