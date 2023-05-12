const BACK_URL = 'https://app-nufemit-back.herokuapp.com/';
//const BACK_URL = 'http://localhost:8080/';

function sendPostNoAuthorization(path, body, errorHandle, successHandle) {
    fetch(BACK_URL + path, {
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
        .catch(error => console.error('Error:', error));
}

function sendPost(path, body, successHandle) {
    fetch(BACK_URL + path, {
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
        .catch(error => console.error('Error:', error));
}

function sendPut(path, body, successHandle) {
    fetch(BACK_URL + path, {
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
        .catch(error => console.error('Error:', error));
}

function sendGet(path, successHandle) {
    fetch(BACK_URL + path, {
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
        .catch(error => console.error('Error:', error));
}

function sendDelete(path, successHandle) {
    fetch(BACK_URL + path, {
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
        .catch(error => console.error('Error:', error));
}

function fetchFile(fileName, successFetchFile, errorHandler) {
    fetch(BACK_URL + 'resources/' + fileName, {
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "./login.html";
            } else if (response.status == 404) {
                errorHandler();
            } else {
                response.arrayBuffer().then(data => {
                    const mimeType = response.headers.get('content-type');
                    const blob = new Blob([data], { type: mimeType });
                    const reader = new FileReader();
                    reader.onload = () => {
                        successFetchFile(reader.result);
                    };
                    reader.readAsDataURL(blob);
                });
            }
        })
        .catch(error => console.error(error));
}

function sendFile(file, fileName) {
    const formData = new FormData();
    formData.append('file', file);
    fetch(BACK_URL + 'resources/' + fileName, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "./login.html";
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            return true;
        })
        .catch(error => console.error(error));
}