function getRestaurantData(){
    var req = new XMLHttpRequest();
    req.open('GET', rest_url, true);

    req.onload = function(){
        rest_array = JSON.parse(req.responseText);

        console.log(rest_array);

        displayRest(currFilter);
    };
    req.send();
}
function displayRest(currFilter){
    var table = document.getElementById("restaurantTable");
    var restCount = 0;
    var message = "";

    table.innerHTML= "";
    totalRest = rest_array.length;
    for(var count = 0; count< totalRest; count++){
        // //if(rest_array[count].cuisine == currFilter){
            
        var thumbnail = rest_array[count].imageBlob;
        if(thumbnail == null){
            thumbnail = "./assets/placeholder.png";
        }

        var title =rest_array[count].name;
        // }

        var cell = '<div class="card col-md-3" ><img class="card-img-top" src="'+ thumbnail + '" alt="Card image cap">\
                        <h5 style="padding-left:30px;cursor:pointer" data-toggle="modal" data-target="#movieModal" class="card-title" item="' + count + '" onClick="showMovieDetails(this)">' + title + '</h5></div>\
                    </div>'
        table.insertAdjacentHTML('beforeend', cell);
        restCount++;

    }
    console.log("Restaurant count: ",restCount);
    
}
