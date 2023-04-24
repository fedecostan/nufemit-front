const data = [
    { "title": "MyTitle1", "description": "MyDescription1", "place": "MyCity1" },
    { "title": "MyTitle2", "description": "MyDescription2", "place": "MyCity2" },
    { "title": "MyTitle3", "description": "MyDescription3", "place": "MyCity3" },
    { "title": "MyTitle4", "description": "MyDescription4", "place": "MyCity4" },
    { "title": "MyTitle5", "description": "MyDescription5", "place": "MyCity5" }
];

const activityHtml =
'<div class="row m-0 p-1">'+
    '<div class="col-2 p-0">'+
        '<img src="images/icon.png" class="object-fit-contain w-100" style="max-height: 100px;">'+
    '</div>'+
    '<div class="col-10">'+
        '<h6>${title} - ${place}</h6>'+
    '</div>'+
'</div>';

var activityList = document.getElementById("activityList");
data.forEach(activity => activityList.innerHTML += activityHtml
    .replace("${title}", activity.title)
    .replace("${description}", activity.description)
    .replace("${place}", activity.place)
);