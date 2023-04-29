const allMessagesData = [
    {"messageId": 1, "profileImage": "default-profile.jpg" , "username": "Lionel Messi", "lastMessage": "Hello! How are you?", "unread": true},
    {"messageId": 2, "profileImage": "default-profile.jpg" , "username": "Lionel Messi", "lastMessage": "Hello! How are you?", "unread": true},
    {"messageId": 3, "profileImage": "default-profile.jpg" , "username": "Lionel Messi", "lastMessage": "Hello! How are you?", "unread": false},
    {"messageId": 3, "profileImage": "default-profile.jpg" , "username": "Lionel Messi", "lastMessage": "Hello! How are you?", "unread": false}
];

const userMessagesData = [
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "This is a test message", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam", "date": "2023-04-26 18:00"},
    {"flow": "O", "profileImage": "default-profile.jpg", "message": "risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis", "date": "2023-04-26 18:00"},
    {"flow": "I", "profileImage": "default-profile.jpg", "message": "risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis", "date": "2023-04-26 18:00"}
];

const unreadMessage =
    '<div class="col text-start" style="max-width: 20px;">' +
        '<i class="fa fa-circle text-danger"></i>' +
    '</div>';
const messageTemplata =
    '<button class="btn w-100" data-bs-toggle="offcanvas" href="#messageScreen" onClick="loadMessages(${messageId})"">' +
        '<h4 class="py-1 my-0">' +
            '<div class="row align-items-center">' +
                '<div class="col text-center" style="max-width: 80px;">' +
                    '<img src="images/${profileImage}" class="rounded-circle object-fit-cover" style="height: 70px; width: 70px; max-height: 70px; max-width: 70px;">' +
                '</div>' +
                '<div class="col text-start ms-2">' +
                    '<h3 class="m-0 p-0 fw-bold">${username}</h3>' +
                    '<p class="text-secondary m-0 p-0 fs-5 overflow-hidden" style="max-height: 24px">${lastMessage}</p>' +
                '</div>' +
                '${unread}' +
            '</div>' +
        '</h4>' +
    '</button>' +
    '<hr class="my-0">';

const incomingMessageTemplate =
    '<div class="row my-1 mx-3 p-1 align-items-center rounded-3 w-75 bg-success-subtle float-start">' +
        '<div class="col-2 p-0 text-center">' +
            '<img src="images/${profileImage}" class="object-fit-cover w-100 rounded-circle" style="max-height: 50px; max-width: 50px;">' +
        '</div>' +
        '<div class="col-10">' +
            '<h6>${message}<p class="fw-lighter float-end">${date}</p></h6>' +
        '</div>' +
    '</div>';

const outgoingMessageTemplate =
    '<div class="row my-1 mx-3 p-1 align-items-center rounded-3 w-75 bg-primary-subtle float-end">' +
        '<div class="col-10">' +
            '<h6>${message}<p class="fw-lighter float-end">${date}</p></h6>' +
        '</div>' +
        '<div class="col-2 p-0 text-center">' +
            '<img src="images/${profileImage}" class="object-fit-cover w-100 rounded-circle" style="max-height: 50px; max-width: 50px;">' +
        '</div>' +
    '</div>';

var allMessages = document.getElementById("allMessages");
allMessagesData.forEach(message => allMessages.innerHTML += messageTemplata
    .replace("${profileImage}", message.profileImage)
    .replace("${username}", message.username)
    .replace("${lastMessage}", message.lastMessage)
    .replace("${messageId}", message.messageId)
    .replace("${unread}", message.unread ? unreadMessage : '')
);

function loadMessages(messageId) {
    var userMessages = document.getElementById("userMessages");
    userMessages.innerHTML = '';
    userMessagesData.forEach(message => userMessages.innerHTML +=
        (message.flow === 'I' ?
        incomingMessageTemplate : outgoingMessageTemplate)
        .replace("${profileImage}", message.profileImage)
        .replace("${message}", message.message)
        .replace("${date}", message.date)
    );
    var messageScreenBody = document.getElementById("messageScreenBody");
    messageScreenBody.scrollTo(0, messageScreenBody.scrollHeight);
}