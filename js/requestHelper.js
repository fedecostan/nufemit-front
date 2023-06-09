const BACK_URL = 'https://app-nufemit-back.herokuapp.com/';
//const BACK_URL = 'http://localhost:8080/';

function sendPostNoAuthorization(path, body, successHandle, errorHandle) {
    fetch(BACK_URL + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.status == 401) {
                errorHandle();
            } else if (response.status == 412) {
                throw response;
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('loggedId', data.loggedId);
            successHandle();
        })
        .catch(errorBody => {
            try {
                errorBody.json().then(errorMessage => errorHandle(errorMessage));
            } catch (error) {}
        });
}

function sendPost(path, body, successHandle, errorHandle) {
    sendRequest(path, body, successHandle, errorHandle ? errorHandle : null, 'POST')
}

function sendPut(path, body, successHandle, errorHandle) {
    sendRequest(path, body, successHandle, errorHandle ? errorHandle : null, 'PUT')
}

function sendGet(path, successHandle, errorHandle) {
    sendRequest(path, null, successHandle, errorHandle ? errorHandle : null, 'GET')
}

function sendDelete(path, successHandle, errorHandle) {
    sendRequest(path, null, successHandle, errorHandle ? errorHandle : null, 'DELETE')
}

function sendRequest(path, body, successHandle, errorHandle, method) {
    fetch(BACK_URL + path, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('token')
        },
        body: body ? JSON.stringify(body) : null
    })
        .then(response => {
            if (response.status == 401) {
                window.location.href = "./login.html";
            } else if (response.status == 412) {
                throw response;
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('loggedId', data.loggedId);
            successHandle(data);
        })
        .catch(errorBody => {
            try {
                errorBody.json().then(errorMessage => errorHandle(errorMessage));
            } catch (error) {}
        });
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
            return response.json();
        })
        .then(data => {
            return true;
        })
        .catch(error => console.error(error));
}