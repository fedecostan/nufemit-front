sendGet('users/self', loadUser);
sendGet('activities/recent', loadRecentActivities);

function loadUser(data) {
    document.getElementById("profileName").innerHTML = getFullName(data.response.user);
    document.getElementById("profileLocation").innerHTML = data.response.user.location;
    document.getElementById("profileActivitiesCount").innerHTML = data.response.activities;
    document.getElementById("profileFollowers").innerHTML = data.response.followers;
    document.getElementById("profileFollowing").innerHTML = data.response.following;
    document.getElementById("profileRatingStars").innerHTML = getStarConfiguration(data.response.rating);
    setProfileImage(data.response.user.profileImage, "profileImage");
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
    data.response.forEach(activity => activityList.innerHTML += activityProfileHtml
        .replace("${title}", activity.title)
        .replace("${description}", activity.description)
        .replace("${place}", activity.place)
    );
}

function openFollowers() {
    sendGet('users/followers', loadFollowers)
}

function loadFollowers(data) {
    var followersList = document.getElementById("followersList");
    followersList.innerHTML = '';
    data.response.forEach(user => {
        followersList.innerHTML += userHtml
            .replace("${profileImage}", "follower" + user.profileImage)
            .replace("${id}", user.id)
            .replace("${username}", user.name + " " + user.lastname);
        setProfileImage(user.profileImage, "follower" + user.profileImage);
    })
}

function openFollowing() {
    sendGet('users/following', loadFollowing)
}

function loadFollowing(data) {
    var followingList = document.getElementById("followingList");
    followingList.innerHTML = '';
    data.response.forEach(user => {
        followingList.innerHTML += userHtml
            .replace("${profileImage}", "following" + user.profileImage)
            .replace("${id}", user.id)
            .replace("${username}", user.name + " " + user.lastname);
        setProfileImage(user.profileImage, "following" + user.profileImage);
    })
}

function openSearchUser() {
    sendGet('users', loadUsers)
}

function loadUsers(data) {
    var userList = document.getElementById("userList");
    userList.innerHTML = '';
    data.response.forEach(user => {
        userList.innerHTML += userHtml
            .replace("${profileImage}", "search" + user.profileImage)
            .replace("${id}", user.id)
            .replace("${username}", user.name + " " + user.lastname);
        setProfileImage(user.profileImage, "search" + user.profileImage);
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