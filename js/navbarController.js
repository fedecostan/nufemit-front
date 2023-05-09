document.getElementById("homeScreen").addEventListener("click", () => window.location.href = "./home.html");
document.getElementById("activitySearchScreen").addEventListener("click", () => window.location.href = "./activitySearch.html");
document.getElementById("messagesScreen").addEventListener("click", () => window.location.href = "./messages.html");
document.getElementById("profileScreen").addEventListener("click", () => window.location.href = "./profile.html");
document.getElementById("settingsScreen").addEventListener("click", () => window.location.href = "./settings.html");

sendGet('messages', loadConversations);

function loadConversations(data) {
    var unreadMessages = 0;
    data.response.forEach(message => unreadMessages += message.unread ? 1 : 0);
    document.getElementById("unreadMessages").innerHTML =
        unreadMessages > 99 ? '99+' :
            unreadMessages > 0 ? unreadMessages : '';
}