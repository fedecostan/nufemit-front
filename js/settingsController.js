//var activityList = document.getElementById("activityList");
//data.forEach(activity => activitySettingsHtml.innerHTML += activityHtml
//    .replace("${title}", activity.title)
//    .replace("${description}", activity.description)
//    .replace("${place}", activity.place)
//);

function signOut() {
    sessionStorage.setItem('token', '');
    window.location.href = "./login.html"
}

function deleteAccount() {
    console.log("DELETING ACCOUNT");
    sendDelete('users', () => signOut());
}