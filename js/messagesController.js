sendGet('messages', loadConversations);

function loadConversations(data) {
    var allMessages = document.getElementById("allMessages");
    allMessages.innerHTML = '';
    data.response.forEach(message => {
        var userProvisionalId = String(Date.now()) + String(Math.floor(Math.random() * 900) + 100);
        allMessages.innerHTML += messageTemplata
            .replace("${profileImage}", message.userProfileImage ? message.userProfileImage : userProvisionalId)
            .replace("${conversationId}", message.conversationId)
            .replace("${userId}", message.userId)
            .replace("${userId}", message.userId)
            .replace("${username}", message.conversationUser)
            .replace("${username}", message.conversationUser)
            .replace("${lastMessage}", message.lastMessage)
            .replace("${date}", formatDate(message.date))
            .replace("${unread}", message.unread ? unreadMessage : '');
        if (message.userProfileImage) {
            setProfileImage(message.userProfileImage, message.userProfileImage);
        } else {
            setProfileImage(null, userProvisionalId);
        }
    }
    );
}

function refreshMessages() {
    window.location.href = "./messages.html";
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

function loadMessages(conversationId, userId, userName) {
    newMessageConversationName = userName;
    newMessageConversationUser = userId;
    newMessageConversationId = conversationId;
    sendGet('messages/' + conversationId, loadConversationMessages);
    document.getElementById("newMessageInput").value = "";
    document.getElementById("messageUserTitle").innerHTML = BACK_ARROW + userName;
}

function loadConversationMessages(data) {
    var userMessages = document.getElementById("userMessages");
    userMessages.innerHTML = '';
    data.response.forEach(message => userMessages.innerHTML +=
        (message.flow === 'I' ?
            incomingMessageTemplate : outgoingMessageTemplate)
            .replace("${message}", message.message)
            .replace("${date}", formatMessageDate(message.dateTime))
    );
    sendGet('users/' + newMessageConversationUser, loadIncomingImage);
    sendGet('users/self', loadOutgoingImage);
    const outgoingImages = document.querySelectorAll('[data-group="outgoing"]');
    for (let i = 0; i < outgoingImages.length; i++) {
        outgoingImages[i].src = 'image-b.jpg';
    }
    var messageScreenBody = document.getElementById("messageScreenBody");
    messageScreenBody.scrollTo(0, messageScreenBody.scrollHeight);
}

function formatMessageDate(dateTime) {
    const date = new Date(dateTime);
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
    const monthOfYear = monthsOfYear[date.getMonth() + 1];
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().substr(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${monthOfYear} ${dayOfMonth}, ${year}`;
}

function loadIncomingImage(data) {
    if (data.response.user.profileImage) {
        fetchFile(data.response.user.profileImage,
            image => setImage(image, "incoming"),
            () => setImage("images/default-profile.jpg", "incoming"));
    } else {
        setImage("images/default-profile.jpg", "incoming");
    }
}

function loadOutgoingImage(data) {
    if (data.response.user.profileImage) {
        fetchFile(data.response.user.profileImage,
            image => setImage(image, "outgoing"),
            () => setImage("images/default-profile.jpg", "outgoing"));
    } else {
        setImage("images/default-profile.jpg", "outgoing");
    }
}

function setImage(image, flow) {
    const imgs = document.querySelectorAll('[data-group="' + flow + '"]');
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = image;
    }
}

var newMessageConversationName;
var newMessageConversationId;
var newMessageConversationUser;
function sendMessage() {
    var newMessage = document.getElementById("newMessageInput").value;
    if (newMessage.length > 0) {
        sendPost('messages', { "receiverId": newMessageConversationUser, "message": newMessage }, () => loadMessages(newMessageConversationId, newMessageConversationUser, newMessageConversationName))
    }
}

document.getElementById("newMessageInput").addEventListener("keyup", ifEnterSendMessage);
function ifEnterSendMessage(e) {
    if (e.code == "Enter") {
        sendMessage();
    }
}

function openUser(userId) {
    sessionStorage.setItem('userId', userId);
    window.location.href = "./user.html";
}