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
    resetInputs();
    var profileImgId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
    var image = document.getElementById("profileImageInput").files;
    var newUser = {
        "name": nameInput.value,
        "lastname": lastnameInput.value,
        "secondLastname": secondLastnameInput.value,
        "location": locationInput.value,
        "birthDate": birthDateInput.value,
        "email": emailInput.value,
        "password": passwordInput.value,
        "phone": phoneInput.value,
        "profileImage": image.length > 0 ? profileImgId : null
    }
    sendPostNoAuthorization('users', newUser,
        () => {
            if (image.length > 0) {
                compressImage(image[0])
                    .then(compressedImg => sendFile(compressedImg, profileImgId))
                    .then(response => window.location.href = "./login.html");
            } else {
                window.location.href = "./login.html";
            }
        },
        showInvalidFields
    );
}

function showInvalidFields(data) {
    showAlert("Fields marked are not properly completed<br>" + data.reason);
    data.erroredFields.forEach(erroredField => {
        if (erroredField === "EMAIL") emailInput.classList.add(INVALID)
        if (erroredField === "PASSWORD") passwordInput.classList.add(INVALID)
        if (erroredField === "NAME") nameInput.classList.add(INVALID)
        if (erroredField === "LASTNAME") lastnameInput.classList.add(INVALID)
    });
}

function resetInputs() {
    document.getElementById("alert").style.display = "none";
    emailInput.classList.remove(INVALID);
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