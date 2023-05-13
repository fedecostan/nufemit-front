function loadActivities(data) {
    var activityList = document.getElementById("activityList");
    activityList.innerHTML = '';
    data.response.reverse();
    data.response.forEach(activity => activityList.innerHTML += activitySearchHtml
        .replace("${title}", activity.title)
        .replace("${description}", shortText(activity.description))
        .replace("${place}", activity.place)
        .replace("${dateTime}", formatDate(activity.dateTime))
        .replace("${id}", activity.id));
}

function shortText(text) {
    if (text.length > 23) {
        const newStr = text.substring(0, 20) + '...';
        return newStr;
    } else {
        return text;
    }
}

sendGet('activities', loadActivities)

function formatDate(dateTime) {
    const date = new Date(dateTime);
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('en-GB', options);
}

function openActivity(activityId) {
    sendGet('activities/' + activityId, loadActivity);
}

function loadActivity(data) {
    document.getElementById("activityTitle").innerHTML = backButtton + data.response.title;
    document.getElementById("description").innerHTML = getDescription(data.response.shortDescription, data.response.description);
    document.getElementById("place").value = data.response.place;
    document.getElementById("time").value = formatDate(data.response.dateTime);
    document.getElementById("price").value = data.response.price;
    document.getElementById("registered").innerHTML = data.response.joiners.length + "/" + data.response.limit;
    document.getElementById("activityAction").innerHTML = data.response.joined ?
        leaveButton.replace("${id}", data.response.id) :
        joinButton.replace("${id}", data.response.id);
    var seeJoiners = document.getElementById("seeJoinersBtn");
    if (data.response.joiners.length == 0) {
        seeJoiners.disabled = true;
    } else {
        seeJoiners.disabled = false;
        var joinerList = document.getElementById("joinerList");
        joinerList.innerHTML = '';
        data.response.joiners.forEach(joiner => {
            joinerList.innerHTML += userHtml
                .replace("${profileImage}", joiner.profileImage)
                .replace("${id}", joiner.id)
                .replace("${username}", joiner.name + " " + joiner.lastname);
            setProfileImage(joiner.profileImage, joiner.profileImage);
        })
    }
    if (!data.response.joined) {
        if (data.response.joiners.length == data.response.limit) {
            document.getElementById("joinBtn").disabled = true;
        } else {
            document.getElementById("joinBtn").disabled = false;
        }
    }
}

function join(activityId) {
    sendPut('registration/register/' + activityId, null, () => openActivity(activityId));
}

function unregister(activityId) {
    sendPut('registration/unregister/' + activityId, null, () => openActivity(activityId));
}

const READ_MORE = "More";
const READ_LESS = "Less";
var expanded = false;
var descriptionBtn = document.getElementById("descriptionBtn");
descriptionBtn.innerHTML = "";
function getDescription(shortDescription, description) {
    if (shortDescription.length == description.length) {
        descriptionBtn.style.display = "none";
        return description;
    } else {
        descriptionBtn.style.display = "block";
        descriptionBtn.innerHTML = READ_MORE;
        activityShortDescription = shortDescription;
        activityDescription = description;
        return shortDescription
    }
}
var activityShortDescription;
var activityDescription;
function toggleDescription() {
    if (expanded) {
        expanded = false;
        document.getElementById("description").innerHTML = activityShortDescription;
        descriptionBtn.innerHTML = READ_MORE;
    } else {
        expanded = true;
        document.getElementById("description").innerHTML = activityDescription;
        descriptionBtn.innerHTML = READ_LESS;
    }
}

function createActivity() {
    var title = document.getElementById("titleInput").value;
    var description = document.getElementById("descriptionInput").value;
    var place = document.getElementById("placeInput").value;
    var date = document.getElementById("dateInput").value;
    var price = document.getElementById("priceInput").value;
    var maxParticipants = document.getElementById("maxParticipantsInput").value;
    sendPost('activities', { "title": title, "description": description, "place": place, "dateTime": date, "maxParticipants": maxParticipants, "price": price }, () => sendGet('activities', loadActivities))
}

function searchActivities() {
    var searchBox = document.getElementById("searchInput").value;
    sendGet('activities?searchBox=' + searchBox, loadActivities)
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