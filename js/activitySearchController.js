const data = [
    { "id": 1, "title": "MyTitle1", "description": "MyDescription1", "place": "MyCity1" },
    { "id": 2, "title": "MyTitle2", "description": "MyDescription2", "place": "MyCity2" },
    { "id": 3, "title": "MyTitle3", "description": "MyDescription3", "place": "MyCity3" },
    { "id": 4, "title": "MyTitle4", "description": "MyDescription4", "place": "MyCity4" },
    { "id": 5, "title": "MyTitle5", "description": "MyDescription5", "place": "MyCity5" },
    { "id": 6, "title": "MyTitle6", "description": "MyDescription6", "place": "MyCity6" },
    { "id": 7, "title": "MyTitle7", "description": "MyDescription7", "place": "MyCity7" },
    { "id": 8, "title": "MyTitle8", "description": "MyDescription8", "place": "MyCity8" }
];

const activityData = {
    "id": 1,
    "title": "MyTitle1",
    "shortDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices sagittis orci a sceleris...",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices sagittis orci a scelerisque. Vestibulum lorem sed risus ultricies. Quis enim lobortis scelerisque fermentum dui. In arcu cursus euismod quis viverra nibh cras. Et netus et malesuada fames ac. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Id volutpat lacus laoreet non curabitur gravida. Enim facilisis gravida neque convallis a cras semper. Bibendum ut tristique et egestas quis ipsum suspendisse. Quis commodo odio aenean sed. A pellentesque sit amet porttitor eget. Leo duis ut diam quam nulla porttitor massa id neque. Felis imperdiet proin fermentum leo vel orci porta. Magna eget est lorem ipsum. Tortor consequat id porta nibh venenatis cras sed. Adipiscing bibendum est ultricies integer quis auctor elit. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor.",
    "place": "MyCity",
    "time": "09:00",
    "price": "25.00",
    "joined": true,
    "joiners": [
        { "profileImage": "default-profile.jpg", "username": "Joiner 11111"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"},
        { "profileImage": "default-profile.jpg", "username": "joiner 22222"},
        { "profileImage": "default-profile.jpg", "username": "joiner 33333"}
    ],
    "limit": 40
}

const activityHtml =
'<div class="row mx-1 my-2 p-3 border border-2 border-secondary-subtle rounded-4 bg-white">'+
    '<div class="col-3 p-0">'+
        '<img src="images/icon.png" class="rounded object-fit-contain w-100" style="max-height: 100px;">'+
    '</div>'+
    '<div class="col-6">'+
        '<h5>${title}</h5>'+
        '<h6 class="text-body-secondary">${place}</h6>'+
        '<p class="m-0">${description}</p>'+
    '</div>'+
    '<div class="col-3 text-center">'+
        '<button type="button" class="btn btn-success w-100 mt-2" data-bs-toggle="offcanvas" href="#activityScreen" onClick="loadActivity(${id})">Join</button>'+
    '</div>'+
'</div>';

const joinerHtml =
    '<div class="row align-items-center">' +
        '<div class="col text-center" style="max-width: 80px;">' +
            '<img src="images/${profileImage}" class="rounded-circle object-fit-cover" style="height: 70px; width: 70px; max-height: 70px; max-width: 70px;">' +
        '</div>' +
        '<div class="col text-start ms-2">' +
            '<h3 class="m-0 p-0 fw-bold">${username}</h3>' +
        '</div>' +
    '</div>';

const backButtton = '<i class="fa fa-chevron-left me-4" data-bs-dismiss="offcanvas"></i>';

const joinButton = '<button type="button" class="btn btn-lg btn-success w-50 my-3">JOIN</button>';
const leaveButton = '<button type="button" class="btn btn-lg btn-danger w-50 my-3">LEAVE</button>';

var activityList = document.getElementById("activityList");
data.forEach(activity => activityList.innerHTML += activityHtml
    .replace("${title}", activity.title)
    .replace("${description}", activity.description)
    .replace("${place}", activity.place)
    .replace("${id}", activity.id)
);

function loadActivity(activityId) {
    document.getElementById("activityTitle").innerHTML = backButtton + activityData.title;
    document.getElementById("description").innerHTML = activityData.shortDescription;
    document.getElementById("place").value = activityData.place;
    document.getElementById("time").value = activityData.time;
    document.getElementById("price").value = activityData.price;
    document.getElementById("registered").innerHTML = activityData.joiners.length + "/" + activityData.limit;
    document.getElementById("activityAction").innerHTML = activityData.joined ? leaveButton : joinButton;
}

function loadJoiners(activityId) {
    var joinerList = document.getElementById("joinerList");
    activityData.joiners.forEach(joiner => {
        joinerList.innerHTML += joinerHtml
            .replace("${profileImage}", joiner.profileImage)
            .replace("${username}", joiner.username)
    })
}

const READ_MORE = "More";
const READ_LESS = "Less";
var expanded= false;
var descriptionBtn = document.getElementById("descriptionBtn");
descriptionBtn.innerHTML = READ_MORE;
function toggleDescription() {
    if (expanded) {
        expanded = false;
        document.getElementById("description").innerHTML = activityData.shortDescription;
        descriptionBtn.innerHTML = READ_MORE;
    } else {
        expanded = true;
        document.getElementById("description").innerHTML = activityData.description;
        descriptionBtn.innerHTML = READ_LESS;
    }
}