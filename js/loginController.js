document.getElementById("emailInput").addEventListener("keyup", ifEnterLogin);
document.getElementById("passwordInput").addEventListener("keyup", ifEnterLogin);
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("recoverPasswordBtn").addEventListener("click", recoverPassword);
document.getElementById("signUpBtn").addEventListener("click", signUp);

function ifEnterLogin(e) {
    if (e.code == "Enter") {
        login();
    }
}

function login() {
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
    if (email.length < 8 || password.length < 8) {
        document.getElementById("loginErrorMsg").style.display = "block";
    }
    console.log("Login: " + email + " - " + password);
}

function recoverPassword() {

}

function signUp() {
    window.location.href = "./signup.html";
}

initialSetUp();

function initialSetUp() {
    document.getElementById("loginErrorMsg").style.display = "none";
}