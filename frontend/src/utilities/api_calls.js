import { apiService } from './api.service.js'

const base_url = 'http://localhost:8000'
// const base_websocket_url = 'admin.starskillgame.com'
// const base_url = 'http://localhost:9000'
// const base_websocket_url = 'localhost:9000'

function loginAdminUser() {
    var user = {
        "username": "admin",
        "password": "admin"
    }
    const endpoint = base_url + '/api/token/'
    return apiService(endpoint, 'POST', user)
}

function submitPrompt(data) {
    const endpoint = base_url + '/user/prompts/update_prompt/'
    return apiService(endpoint, 'POST', data)
}

function getPrompt() {
    const endpoint = base_url + '/user/prompts/get_prompt/'
    return apiService(endpoint, 'GET', null)
}


export {
    loginAdminUser,
    submitPrompt,
    getPrompt
}