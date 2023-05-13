var userId = sessionStorage.getItem('userId');
sendGet('users/' + userId, loadUser);
sendGet('activities/recent/' + userId, loadRecentActivities);

function loadUser(data) {
    document.getElementById("profileName").innerHTML = getFullName(data.response.user);
    document.getElementById("profileLocation").innerHTML = data.response.user.location;
    document.getElementById("profileActivitiesCount").innerHTML = data.response.activities;
    document.getElementById("profileFollowers").innerHTML = data.response.followers;
    document.getElementById("profileFollowing").innerHTML = data.response.following;
    document.getElementById("profileRatingStars").innerHTML = getStarConfiguration(data.response.rating);
    setProfileImage(data.response.user.profileImage, "profileImage");
    var followAction = document.getElementById("followAction");
    followAction.innerHTML = data.response.followedByUser ?
        '<button type="button" class="btn btn-danger" onclick="unfollow()">Unfollow</button>' :
        '<button type="button" class="btn btn-primary" onclick="follow()">Follow</button>'
}

function follow() {
    sendPut('users/follow/' + userId, null, () => sendGet('users/' + userId, loadUser));
}

function unfollow() {
    sendPut('users/unfollow/' + userId, null, () => sendGet('users/' + userId, loadUser));
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
    sendGet('users/followers/' + userId, loadFollowers)
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
    sendGet('users/following/' + userId, loadFollowing)
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

var rating = 0;
function rate(num) {
    var star1 = document.getElementById("rateStar1");
    var star2 = document.getElementById("rateStar2");
    var star3 = document.getElementById("rateStar3");
    var star4 = document.getElementById("rateStar4");
    var star5 = document.getElementById("rateStar5");
    rating = num;
    if (num == 1) {
        star1.innerHTML = FULL_STAR;
        star2.innerHTML = EMPT_STAR;
        star3.innerHTML = EMPT_STAR;
        star4.innerHTML = EMPT_STAR;
        star5.innerHTML = EMPT_STAR;
    } else if (num == 2) {
        star1.innerHTML = FULL_STAR;
        star2.innerHTML = FULL_STAR;
        star3.innerHTML = EMPT_STAR;
        star4.innerHTML = EMPT_STAR;
        star5.innerHTML = EMPT_STAR;
    } else if (num == 3) {
        star1.innerHTML = FULL_STAR;
        star2.innerHTML = FULL_STAR;
        star3.innerHTML = FULL_STAR;
        star4.innerHTML = EMPT_STAR;
        star5.innerHTML = EMPT_STAR;
    } else if (num == 4) {
        star1.innerHTML = FULL_STAR;
        star2.innerHTML = FULL_STAR;
        star3.innerHTML = FULL_STAR;
        star4.innerHTML = FULL_STAR;
        star5.innerHTML = EMPT_STAR;
    } else if (num == 5) {
        star1.innerHTML = FULL_STAR;
        star2.innerHTML = FULL_STAR;
        star3.innerHTML = FULL_STAR;
        star4.innerHTML = FULL_STAR;
        star5.innerHTML = FULL_STAR;
    }
}

function confirmRating() {
    sendPost('ratings', { "id": userId, "rating": rating, "comment": null }, () => sendGet('users/' + userId, loadUser));
}

function openUser(userId) {
    sendGet('users/id', (data) => {
        if (data.response == userId) {
            window.location.href = "./profile.html";
        } else {
            sessionStorage.setItem('userId', userId);
            window.location.href = "./user.html";
        }
    });
}

function sendMessage() {
    var newMessage = document.getElementById("newMessageInput").value;
    if (newMessage.length > 0) {
        sendPost('messages', { "receiverId": userId, "message": newMessage }, () => document.getElementById("newMessageInput").value = "")
    }
}

document.getElementById("newMessageInput").addEventListener("keyup", ifEnterSendMessage);
function ifEnterSendMessage(e) {
    if (e.code == "Enter") {

        sendMessage();
    }
}