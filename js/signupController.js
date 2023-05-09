document.getElementById("signupBtn").addEventListener("click", signup);
document.getElementById("cancelBtn").addEventListener("click", cancel);
const INVALID = "is-invalid";
var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var nameInput = document.getElementById("nameInput");
var lastnameInput = document.getElementById("lastnameInput");
var secondLastnameInput = document.getElementById("secondLastnameInput");
var phoneInput = document.getElementById("phoneInput");
var locationInput = document.getElementById("locationInput");
var birthDateInput = document.getElementById("birthdateInput");

function signup() {
    if (inputsValid()) {
        var newUser = {
            "name": nameInput.value,
            "lastname": lastnameInput.value,
            "secondLastname": secondLastnameInput.value,
            "location": locationInput.value,
            "birthDate": birthDateInput.value,
            "email": emailInput.value,
            "password": passwordInput.value,
            "phone": phoneInput.value
        }
        sendPostNoAuthorization('users', newUser,
            () => showAlert("ERROR TRY AGAIN"),
            () => window.location.href = "./login.html");
    }
}

function inputsValid() {
    resetValidations();
    var errorMsg = "";
    if (emailInput.value.length < 5) {
        emailInput.classList.add(INVALID)
        errorMsg += "Invalid email<br>"
    }
    if (passwordInput.value.length < 8) {
        passwordInput.classList.add(INVALID)
        errorMsg += "Invalid password<br>"
    }
    if (nameInput.value.length < 1) {
        nameInput.classList.add(INVALID)
        errorMsg += "Invalid name<br>"
    }
    if (lastnameInput.value.length < 1) {
        lastnameInput.classList.add(INVALID)
        errorMsg += "Invalid lastname<br>"
    }
    if (secondLastnameInput.value.length < 1) {
        secondLastnameInput.classList.add(INVALID)
        errorMsg += "Invalid second lastname<br>"
    }
    if (phoneInput.value.length < 1) {
        phoneInput.classList.add(INVALID)
        errorMsg += "Invalid phone<br>"
    }
    if (locationInput.value.length < 1) {
        locationInput.classList.add(INVALID)
        errorMsg += "Invalid location<br>"
    }
    if (birthDateInput.value.length < 1) {
        birthDateInput.classList.add(INVALID)
        errorMsg += "Invalid birthdate<br>"
    }
    if (errorMsg.length == 0) {
        return true;
    }
    showAlert(errorMsg);
    return false;
}

function resetValidations() {
    emailInput.classList.remove(INVALID)
    passwordInput.classList.remove(INVALID)
    nameInput.classList.remove(INVALID)
    lastnameInput.classList.remove(INVALID)
    birthDateInput.classList.remove(INVALID)
}

function showAlert(msg) {
    document.getElementById("alert").innerHTML = msg;
    document.getElementById("alert").style.display = "block";
}

function cancel() {
    window.location.href = "./login.html";
}

initialSetUp();
function initialSetUp() {
    document.getElementById("alert").style.display = "none";
}