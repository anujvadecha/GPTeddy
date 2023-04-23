backend_url = "20.232.156.33"

import requests
import json



currentBearer = None

def login(username='admin', password='admin'):
    url = f"http://{backend_url}/api/token/"
    payload = json.dumps({
      "username": "admin",
      "password": "admin"
    })
    headers = {
      'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    currentBearer = 'Bearer ' + response.json()['access']
    return "SUCCESS"

def get_chat_response(text):
    import requests
    import json
    url = f"http://{backend_url}/chat/speak/"
    payload = json.dumps({
        "message": text
    })
    if currentBearer is None:
        login()
    headers = {
        'Authorization': currentBearer,
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    return response.json()['message']