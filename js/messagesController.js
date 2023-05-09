sendGet('messages', loadConversations);

function loadConversations(data) {
    var allMessages = document.getElementById("allMessages");
    allMessages.innerHTML = '';
    var unreadMessages = 0;
    data.response.forEach(message => allMessages.innerHTML += messageTemplata
        .replace("${profileImage}", 'default-profile.jpg')
        .replace("${conversationId}", message.conversationId)
        .replace("${userId}", message.userId)
        .replace("${username}", message.conversationUser)
        .replace("${username}", message.conversationUser)
        .replace("${lastMessage}", message.lastMessage)
        .replace("${date}", formatDate(message.date))
        .replace("${unread}", message.unread ? unreadMessage : '')
    );
}

function formatDate(dateTime) {
    const date = new Date(dateTime);
    const options = { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleString('en-GB', options);
}

function loadMessages(conversationId, userId, userName) {
    sendGet('messages/' + conversationId, loadConversationMessages);
    document.getElementById("newMessageInput").value = "";
    document.getElementById("messageUserTitle").innerHTML = BACK_ARROW + userName;
    newMessageConversationName = userName;
    newMessageConversationUser = userId;
    newMessageConversationId = conversationId;
}

function loadConversationMessages(data) {
    var userMessages = document.getElementById("userMessages");
    userMessages.innerHTML = '';
    data.response.forEach(message => userMessages.innerHTML +=
        (message.flow === 'I' ?
            incomingMessageTemplate : outgoingMessageTemplate)
            .replace("${profileImage}", 'default-profile.jpg')
            .replace("${message}", message.message)
            .replace("${date}", formatDate(message.dateTime))
    );
    var messageScreenBody = document.getElementById("messageScreenBody");
    messageScreenBody.scrollTo(0, messageScreenBody.scrollHeight);
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