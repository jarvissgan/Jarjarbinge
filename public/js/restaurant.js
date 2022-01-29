function getRestaurantData() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://127.0.0.1:8080/restaurant', true);

    req.onload = function () {
        sessionStorage.setItem("restaurantArray", req.responseText);
        rest_array = JSON.parse(req.responseText);
        console.log(rest_array);

        displayRest(currFilter);
    };
    req.send();
}

function displayRest(currFilter) {
    var table = document.getElementById("restaurantTable");
    var restCount = 0;
    var message = "";

    //table.innerHTML = "";
    totalRest = rest_array.length;
    
    for (var count = 0; count < totalRest; count++) {
        // //if(rest_array[count].cuisine == currFilter){

        var thumbnail = rest_array[count].imageBlob;
        if (thumbnail == null) {
            thumbnail = "./assets/placeholder.png";
        }

        var title = rest_array[count].name;
        // }

        var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\
                        <h5 style="padding-left:30px;cursor:pointer" id="'+count+ '"class="card-title" item="' + count + '" onClick="saveRestaurantDetail(this.id)">' + title + '</h5>\
                    </div>'
        table.insertAdjacentHTML('afterbegin', cell);
        restCount++;
    }
    console.log("restTable", document.getElementById("restaurantTable"));
    console.log("Restaurant count: ", restCount);
    message = restCount + " Restaurants total";
    document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}

function saveRestaurantDetail(count){
    sessionStorage.setItem("count", count);
    window.location.replace('restaurantDetails.html');
}

function loadRestaurantOnPage(){
    rest_array = sessionStorage.getItem("restaurantArray");
    rest_array = JSON.parse(rest_array);
    console.log('rest_array: ', rest_array);
    count = sessionStorage.getItem("count");
    console.log('count: ', count);
    console.log(rest_array[count].name);

    window.onload = onPageload();
    function onPageload(){
        console.log('document.getElementById("restaurantName"): ', document.getElementById("restaurantName"));

        document.getElementById("restaurantName").textContent = rest_array[count].name;
        document.getElementById("restaurantDescription").textContent = rest_array[count].description;
        document.getElementById("restaurantAddress").textContent = rest_array[count].address;
        document.getElementById("restaurantCuisine").textContent = rest_array[count].cuisine;
    }
}