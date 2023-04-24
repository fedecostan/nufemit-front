const data = [
    { "title": "MyTitle1", "description": "MyDescription1", "place": "MyCity1" },
    { "title": "MyTitle2", "description": "MyDescription2", "place": "MyCity2" },
    { "title": "MyTitle3", "description": "MyDescription3", "place": "MyCity3" },
    { "title": "MyTitle4", "description": "MyDescription4", "place": "MyCity4" },
    { "title": "MyTitle5", "description": "MyDescription5", "place": "MyCity5" },
    { "title": "MyTitle6", "description": "MyDescription6", "place": "MyCity6" },
    { "title": "MyTitle7", "description": "MyDescription7", "place": "MyCity7" },
    { "title": "MyTitle8", "description": "MyDescription8", "place": "MyCity8" }
];

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
        '<button type="button" class="btn btn-success w-100 mt-2">Join</button>'+
    '</div>'+
'</div>';

var activityList = document.getElementById("activityList");
data.forEach(activity => activityList.innerHTML += activityHtml
    .replace("${title}", activity.title)
    .replace("${description}", activity.description)
    .replace("${place}", activity.place)
);