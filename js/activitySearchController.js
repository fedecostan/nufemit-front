sendGet('activities', loadActivities)

function loadActivities(data) {
    var activityList = document.getElementById("activityList");
    activityList.innerHTML = '';
    data.response.reverse();
    data.response.forEach(activity => {
        var activityProvisionalId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
        activityList.innerHTML += activitySearchHtml
            .replace("${title}", activity.completed ? completedMsg + shorterText(activity.title) : shortText(activity.title))
            .replace("${activityImage}", activity.activityImage ? activity.activityImage : activityProvisionalId)
            .replace("${description}", shortText(activity.description))
            .replace("${place}", activity.place)
            .replace("${dateTime}", formatDate(activity.dateTime))
            .replace("${id}", activity.id);
        if (activity.activityImage) {
            fetchFile(activity.activityImage,
                image => document.getElementById(activity.activityImage).src = image,
                () => document.getElementById(activity.activityImage).src = "images/default-activity.jpg");
        } else {
            document.getElementById(activityProvisionalId).src = "images/default-activity.jpg";
        }
    });
}

function shortText(text) {
    if (text.length > 23) {
        const newStr = text.substring(0, 20) + '...';
        return newStr;
    } else {
        return text;
    }
}

function shorterText(text) {
    if (text.length > 13) {
        const newStr = text.substring(0, 10) + '...';
        return newStr;
    } else {
        return text;
    }
}

function formatDate(dateTime) {
    const date = new Date(dateTime);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().substr(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${dayOfWeek} ${dayOfMonth}/${month}/${year} ${hours}:${minutes}`;
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
    if (data.response.activityImage) {
        fetchFile(data.response.activityImage,
            image => document.getElementById("activityImage").src = image,
            () => document.getElementById("activityImage").src = "images/default-activity.jpg");
    } else {
        document.getElementById("activityImage").src = "images/default-activity.jpg";
    }
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
            var imageProvisionalId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
            joinerList.innerHTML += userHtml
                .replace("${profileImage}", joiner.profileImage ? joiner.profileImage : imageProvisionalId)
                .replace("${id}", joiner.id)
                .replace("${username}", joiner.name + " " + joiner.lastname);
            setProfileImage(joiner.profileImage, joiner.profileImage ? joiner.profileImage : imageProvisionalId);
        })
    }
    if (!data.response.joined) {
        if (data.response.joiners.length == data.response.limit) {
            document.getElementById("joinBtn").disabled = true;
        } else {
            document.getElementById("joinBtn").disabled = false;
        }
    }
    document.getElementById("deleteAction").innerHTML = '';
    if (data.response.creator.id == sessionStorage.getItem('loggedId')) {
        document.getElementById("deleteAction").innerHTML = deleteActivityButton
            .replace("${activityId}", data.response.id);
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

document.getElementById("dateInput").value = new Date().toISOString().slice(0, 16);
function createActivity() {
    var title = document.getElementById("titleInput").value;
    var description = document.getElementById("descriptionInput").value;
    var place = document.getElementById("placeInput").value;
    var date = document.getElementById("dateInput").value;
    var price = document.getElementById("priceInput").value;
    var maxParticipants = document.getElementById("maxParticipantsInput").value;
    var activityImgId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
    var image = document.getElementById("activityImageInput").files;
    sendPost('activities',
        {
            "title": title,
            "description": description,
            "place": place,
            "dateTime": date,
            "maxParticipants": maxParticipants,
            "price": price,
            "activityImage": activityImgId
        },
        () => {
            if (image.length > 0)
                compressImage(image[0])
                    .then(compressedImg => sendFile(compressedImg, activityImgId))
                    .then(response => window.location.href = "./activitySearch.html")
            else
                window.location.href = "./activitySearch.html"
        }
    )
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

function reloadScreen() {
    sendGet('activities', loadActivities);
}

var activityToDeleteId;
function activityToDelete(id) {
    activityToDeleteId = id;
}

function deleteActivity() {
    sendDelete('activities/' + activityToDeleteId, () => window.location.href = "./activitySearch.html");
}