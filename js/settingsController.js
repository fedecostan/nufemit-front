const data = [
    { "title": "MyTitle1", "description": "MyDescription1", "place": "MyCity1" },
    { "title": "MyTitle2", "description": "MyDescription2", "place": "MyCity2" },
    { "title": "MyTitle3", "description": "MyDescription3", "place": "MyCity3" },
    { "title": "MyTitle4", "description": "MyDescription4", "place": "MyCity4" },
    { "title": "MyTitle5", "description": "MyDescription5", "place": "MyCity5" },
    { "title": "MyTitle6", "description": "MyDescription6", "place": "MyCity6" },
    { "title": "MyTitle7", "description": "MyDescription7", "place": "MyCity7" },
    { "title": "MyTitle8", "description": "MyDescription8", "place": "MyCity8" },
    { "title": "MyTitle1", "description": "MyDescription1", "place": "MyCity1" },
    { "title": "MyTitle2", "description": "MyDescription2", "place": "MyCity2" },
    { "title": "MyTitle3", "description": "MyDescription3", "place": "MyCity3" },
    { "title": "MyTitle4", "description": "MyDescription4", "place": "MyCity4" },
    { "title": "MyTitle5", "description": "MyDescription5", "place": "MyCity5" },
    { "title": "MyTitle6", "description": "MyDescription6", "place": "MyCity6" },
    { "title": "MyTitle7", "description": "MyDescription7", "place": "MyCity7" },
    { "title": "MyTitle8", "description": "MyDescription8", "place": "MyCity8" },
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
'<div class="row my-2 mx-3 p-1 border rounded">'+
    '<div class="col-2 p-0">'+
        '<img src="images/icon.png" class="object-fit-contain w-100" style="max-height: 100px;">'+
    '</div>'+
    '<div class="col-8">'+
        '<h4>${title} - ${place}</h4>'+
        '<h6>${description}</h6>'+
    '</div>'+
    '<div class="col-2 text-end align-middle">'+
        '<h3><i class="fa fa-trash text-danger"></i></h3>'+
    '</div>'+
'</div>';

var activityList = document.getElementById("activityList");
data.forEach(activity => activityList.innerHTML += activityHtml
    .replace("${title}", activity.title)
    .replace("${description}", activity.description)
    .replace("${place}", activity.place)
);

function signOut() {
    sessionStorage.setItem('token', '');
    window.location.href = "./login.html"
}