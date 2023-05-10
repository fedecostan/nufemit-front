const URL = 'https://app-nufemit-back.herokuapp.com/';

function sendPostNoAuthorization(path, body, errorHandle, successHandle) {
    fetch(URL + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (!response.ok) {
                errorHandle();
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            successHandle();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sendPost(path, body, successHandle) {
    fetch(URL + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "./login.html";
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            successHandle(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sendPut(path, body, successHandle) {
    fetch(URL + path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: body ? JSON.stringify(body) : null
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "./login.html";
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            successHandle(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sendGet(path, successHandle) {
    fetch(URL + path, {
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "./login.html";
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            successHandle(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function sendDelete(path, successHandle) {
    fetch(URL + path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "./login.html";
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            successHandle(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}