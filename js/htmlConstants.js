const activitySearchHtml =
    '<button type="button" class="btn w-100 p-0 m-0" data-bs-toggle="offcanvas" href="#activityScreen" onClick="openActivity(${id})">' +
    '<div class="row mx-1 my-2 p-3 border border-2 border-secondary-subtle rounded-4 bg-white text-start">' +
    '<div class="col-3 p-0">' +
    '<img src="images/icon.png" class="rounded object-fit-contain w-100" style="max-height: 100px;">' +
    '</div>' +
    '<div class="col-9">' +
    '<h5>${title}</h5>' +
    '<h6 class="text-body-secondary">${place}</h6>' +
    '<h6 class="text-body-secondary">${dateTime}</h6>' +
    '<p class="m-0">${description}</p>' +
    '</div>' +
    '</div>' +
    '</button>';

const userHtml =
    '<button type="button" class="btn w-100 p-0 m-0" onClick="openUser(${id})">' +
    '<div class="row align-items-center">' +
    '<div class="col text-center" style="max-width: 80px;">' +
    '<img id="${profileImage}" class="rounded-circle object-fit-cover" style="height: 70px; width: 70px; max-height: 70px; max-width: 70px;">' +
    '</div>' +
    '<div class="col text-start ms-2">' +
    '<h3 class="m-0 p-0 fw-bold">${username}</h3>' +
    '</div>' +
    '</div>' +
    '</button>';

const activitySettingsHtml =
    '<div class="row my-2 mx-3 p-1 border rounded">' +
    '<div class="col-2 p-0">' +
    '<img src="images/icon.png" class="object-fit-contain w-100" style="max-height: 100px;">' +
    '</div>' +
    '<div class="col-8">' +
    '<h4>${title} - ${place}</h4>' +
    '<h6>${description}</h6>' +
    '</div>' +
    '<div class="col-2 text-end align-middle">' +
    '<h3><i class="fa fa-trash text-danger"></i></h3>' +
    '</div>' +
    '</div>';

const backButtton = '<i class="fa fa-chevron-left me-4" data-bs-dismiss="offcanvas"></i>';

const joinButton = '<button id="joinBtn" type="button" class="btn btn-lg btn-success w-50 my-3" onclick="join(${id})">JOIN</button>';
const leaveButton = '<button type="button" class="btn btn-lg btn-danger w-50 my-3" onclick="unregister(${id})">LEAVE</button>';

const activityProfileHtml =
    '<div class="row m-0 p-1">' +
    '<div class="col-2 p-0">' +
    '<img src="images/icon.png" class="object-fit-contain w-100" style="max-height: 100px;">' +
    '</div>' +
    '<div class="col-10">' +
    '<h4>${title} - ${place}</h4>' +
    '<h6>${description}</h6>' +
    '</div>' +
    '</div>';

const FULL_STAR = '<i class="fa fa-star"></i>';
const HALF_STAR = '<i class="fa fa-star-half-o"></i>';
const EMPT_STAR = '<i class="fa fa-star-o"></i>';

const BACK_ARROW = '<i class="fa fa-chevron-left me-4" data-bs-dismiss="offcanvas" onclick="refreshMessages()"></i>';

const unreadMessage =
    '<div class="col text-start" style="max-width: 20px;">' +
    '<i class="fa fa-circle text-danger"></i>' +
    '</div>';
const messageTemplata =
    '<button class="btn w-100" data-bs-toggle="offcanvas" href="#messageScreen" onClick="loadMessages(${conversationId}, ${userId}, \'${username}\')">' +
    '<h4 class="py-1 my-0">' +
    '<div class="row align-items-center">' +
    '<div class="col text-center" style="max-width: 80px;">' +
    '<img id="${profileImage}" class="rounded-circle object-fit-cover" style="height: 70px; width: 70px; max-height: 70px; max-width: 70px;">' +
    '</div>' +
    '<div class="col text-start ms-2">' +
    '<h3 class="m-0 p-0 fw-bold">${username}</h3>' +
    '<p class="text-secondary m-0 p-0 fs-5 overflow-hidden" style="max-height: 24px">${lastMessage}</p>' +
    '<p class="text-secondary m-0 p-0 fs-5 overflow-hidden" style="max-height: 24px">${date}</p>' +
    '</div>' +
    '${unread}' +
    '</div>' +
    '</h4>' +
    '</button>' +
    '<hr class="my-0">';

const incomingMessageTemplate =
    '<div class="row my-1 mx-3 p-1 align-items-center rounded-3 w-75 bg-success-subtle float-start">' +
    '<div class="col-2 p-0 text-center">' +
    '<img data-group="incoming" class="object-fit-cover w-100 rounded-circle" style="max-height: 50px; max-width: 50px;">' +
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
    '<img data-group="outgoing" class="object-fit-cover w-100 rounded-circle" style="max-height: 50px; max-width: 50px;">' +
    '</div>' +
    '</div>';