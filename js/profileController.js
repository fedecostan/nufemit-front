sendGet('users/self', loadUser);
sendGet('activities/recent', loadRecentActivities);

var loggedUser;

function loadUser(data) {
    document.getElementById("profileName").innerHTML = getFullName(data.response.user);
    document.getElementById("profileLocation").innerHTML = data.response.user.location;
    document.getElementById("profileActivitiesCount").innerHTML = data.response.activities;
    document.getElementById("profileFollowers").innerHTML = data.response.followers;
    document.getElementById("profileFollowing").innerHTML = data.response.following;
    document.getElementById("profileRatingStars").innerHTML = getStarConfiguration(data.response.rating);
    setProfileImage(data.response.user.profileImage, "profileImage");
    loggedUser = data.response.user;
}

function getFullName(user) {
    return user.name + ' ' + user.lastname + ' ' + user.secondLastname;
}

function getStarConfiguration(rating) {
    if (rating == -1) return '<button type="button" class="btn btn-warning text-dark fw-bold" disabled>NO RATING YET</button>';
    if (rating < 0.3) return EMPT_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR;
    if (rating < 0.8) return HALF_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR;
    if (rating < 1.3) return FULL_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR;
    if (rating < 1.8) return FULL_STAR + HALF_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR;
    if (rating < 2.3) return FULL_STAR + FULL_STAR + EMPT_STAR + EMPT_STAR + EMPT_STAR;
    if (rating < 2.8) return FULL_STAR + FULL_STAR + HALF_STAR + EMPT_STAR + EMPT_STAR;
    if (rating < 3.3) return FULL_STAR + FULL_STAR + FULL_STAR + EMPT_STAR + EMPT_STAR;
    if (rating < 3.8) return FULL_STAR + FULL_STAR + FULL_STAR + HALF_STAR + EMPT_STAR;
    if (rating < 4.3) return FULL_STAR + FULL_STAR + FULL_STAR + FULL_STAR + EMPT_STAR;
    if (rating < 4.8) return FULL_STAR + FULL_STAR + FULL_STAR + FULL_STAR + HALF_STAR;
    return FULL_STAR + FULL_STAR + FULL_STAR + FULL_STAR + FULL_STAR;
}

function loadRecentActivities(data) {
    var activityList = document.getElementById("activityList");
    activityList.innerHTML = '';
    data.response.forEach(activity => {
        var activityProvisionalId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
        activityList.innerHTML += activityProfileHtml
            .replace("${title}", activity.title)
            .replace("${activityImage}", activity.activityImage ? activity.activityImage : activityProvisionalId)
            .replace("${description}", activity.description)
            .replace("${place}", activity.place);
        if (activity.activityImage) {
            fetchFile(activity.activityImage,
                image => document.getElementById(activity.activityImage).src = image,
                () => document.getElementById(activity.activityImage).src = "images/default-activity.jpg");
        } else {
            document.getElementById(activityProvisionalId).src = "images/default-activity.jpg";
        }
    }
    );
}

function openFollowers() {
    sendGet('users/followers', loadFollowers)
}

function loadFollowers(data) {
    var followersList = document.getElementById("followersList");
    followersList.innerHTML = '';
    data.response.forEach(user => {
        var userProvisionalId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
        followersList.innerHTML += userHtml
            .replace("${profileImage}", "follower" + (user.profileImage ? user.profileImage : userProvisionalId))
            .replace("${id}", user.id)
            .replace("${username}", user.name + " " + user.lastname);
        if (user.profileImage) {
            setProfileImage(user.profileImage, "follower" + user.profileImage);
        } else {
            setProfileImage(null, "follower" + userProvisionalId);
        }
    })
}

function openFollowing() {
    sendGet('users/following', loadFollowing)
}

function loadFollowing(data) {
    var followingList = document.getElementById("followingList");
    followingList.innerHTML = '';
    data.response.forEach(user => {
        var userProvisionalId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
        followingList.innerHTML += userHtml
            .replace("${profileImage}", "following" + (user.profileImage ? user.profileImage : userProvisionalId))
            .replace("${id}", user.id)
            .replace("${username}", user.name + " " + user.lastname);
        if (user.profileImage) {
            setProfileImage(user.profileImage, "following" + user.profileImage);
        } else {
            setProfileImage(null, "following" + userProvisionalId);
        }
    })
}

function openSearchUser() {
    sendGet('users', loadUsers)
}

function loadUsers(data) {
    var userList = document.getElementById("userList");
    userList.innerHTML = '';
    data.response.forEach(user => {
        var userProvisionalId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
        userList.innerHTML += userHtml
            .replace("${profileImage}", "search" + (user.profileImage ? user.profileImage : userProvisionalId))
            .replace("${id}", user.id)
            .replace("${username}", user.name + " " + user.lastname);
        if (user.profileImage) {
            setProfileImage(user.profileImage, "search" + user.profileImage);
        } else {
            setProfileImage(null, "search" + userProvisionalId);
        }
    })
}

function searchUsers() {
    var searchBox = document.getElementById("searchInput").value;
    sendGet('users?searchBox=' + searchBox, loadUsers)
}

function openUser(userId) {
    sessionStorage.setItem('userId', userId);
    window.location.href = "./user.html";
}

function openEditUser() {
    document.getElementById("nameInput").value = loggedUser.name;
    document.getElementById("lastnameInput").value = loggedUser.lastname;
    document.getElementById("secondLastnameInput").value = loggedUser.secondLastname;
    document.getElementById("phoneInput").value = loggedUser.phone;
    document.getElementById("locationInput").value = loggedUser.location;
    document.getElementById("birthdateInput").value = loggedUser.birthDate;
}

function updateUser() {
    var userChanges = {
        "name": document.getElementById("nameInput").value,
        "lastname": document.getElementById("lastnameInput").value,
        "secondLastname": document.getElementById("secondLastnameInput").value,
        "location": document.getElementById("locationInput").value,
        "birthDate": document.getElementById("birthdateInput").value,
        "phone": document.getElementById("phoneInput").value
    }
    sendPut('users', userChanges, () => window.location.href = "./profile.html")
}

function updateProfileImage() {
    var image = document.getElementById("profileImageInput").files;
    if (image.length > 0) {
        var profileImgId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
        sendPut('users/image', { "profileImage": profileImgId },
            () => compressImage(image[0])
                .then(compressedImg => sendFile(compressedImg, profileImgId))
                .then(response => window.location.href = "./profile.html"))
    }
}