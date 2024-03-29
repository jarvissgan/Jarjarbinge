function getRestaurantData() {
    //gets restaurant data once called
    var req = new XMLHttpRequest();
    req.open('GET', 'http://127.0.0.1:8080/restaurant', true);

    req.onload = function () {
        sessionStorage.setItem("restaurantArray", req.responseText);
        rest_array = JSON.parse(req.responseText);

        displayRest();
    };
    req.send();
}

function displayRest() {
    var table = document.getElementById("restaurantTable");
    var restCount = 0;
    var message = "";

    //table.innerHTML = "";
    totalRest = rest_array.length;
    restaurantTable.innerHTML = "";

    //gets every element in the array and displays it
    for (var count = 0; count < totalRest; count++) {
        var thumbnail = rest_array[count].image;
        if (thumbnail == null) {
            thumbnail = "./assets/placeholder.png";
        }

        var title = rest_array[count].name;

        var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\
                        <h5 style="padding-left:30px;cursor:pointer" id="' + count + '"class="card-title" item="' + count + '" onClick="saveRestaurantDetail(this.id)">' + title + '</h5>\
                    </div>'
        table.insertAdjacentHTML('afterbegin', cell);
        restCount++;
    }
    //updates total restaurant message with total count
    message = restCount + " Restaurants total";
    document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}

function saveRestaurantDetail(count) {
    //saves position of restaurant in array into session storage
    sessionStorage.setItem("count", count);
    window.location.replace('restaurantDetails.html');
}

function loadRestaurantOnPage() {
    //loads restaurant details into restaurantDetails
    rest_array = sessionStorage.getItem("restaurantArray");
    rest_array = JSON.parse(rest_array);
    count = sessionStorage.getItem("count");


    window.onload = onPageload();

    function onPageload() {
        //inserts values into elements to display data
        document.getElementById("restaurantImage").src = rest_array[count].image;
        document.getElementById("restaurantName").textContent = rest_array[count].name;
        document.getElementById("restaurantDescription").textContent = rest_array[count].description;
        document.getElementById("restaurantAddress").textContent = rest_array[count].address;
        document.getElementById("restaurantCuisine").textContent = rest_array[count].cuisine;
        document.getElementById("restaurantNumber").textContent = rest_array[count].number;
        document.getElementById("restaurantNumber").setAttribute("href", "callto:" + rest_array[count].number)
        document.getElementById("restaurantEmail").textContent = rest_array[count].email;
        document.getElementById("restaurantEmail").setAttribute("href", "mailto:" + rest_array[count].email);
    }
}

async function addNewRestaurant() {
    let formData = new FormData();
    try {
        if (sessionStorage.getItem("token") != "") { // checks if token exists
            //if token exists, adds all information to formData and sends to database
            formData.append('token', sessionStorage.getItem('token'));
            formData.append('name', document.getElementById("addRestaurantName").value);
            formData.append('description', document.getElementById("addRestaurantDescription").value);
            formData.append('address', document.getElementById("addRestaurantAddress").value);
            formData.append('cuisine', document.getElementById("addRestaurantCuisine").value);
            formData.append('price', document.getElementById("addRestaurantPrice").value);
            formData.append('image', document.querySelector("#restaurantImage").src);
            formData.append('email', document.getElementById("addRestaurantEmail").value);
            formData.append('number', document.getElementById("addRestaurantNumber").value);

            let response = await fetch('http://127.0.0.1:8080/restaurant', {
                method: 'POST',
                body: formData
            });
            //once response is recieved, shows message and redirects page to index to view added restaurant
            let result = await response.text().then(alert("Restaurant Added!"), window.location.replace("index.html"));

        } else {
            throw "invalid login, try again";
        }

    } catch (error) {
        alert(error);
    }
}

function restaurantFileConvert() {
    // converts restaurant image to base64
    var uploadArray = document.getElementById("restaurantPicture");
    uploadArray.addEventListener("change", function () {
        //detects if array has changed, if changed performs conversion and displays image

        var selectedFile = uploadArray.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            selectedFile.src = e.target.result;
            var srcData = e.target.result;
            document.querySelector("#restaurantImage").src = srcData;
        }
        //converts image to base64
        reader.readAsDataURL(selectedFile);
    });

}

function searchRestaurant() {
    var table = document.getElementById("restaurantTable");
    var restCount = 0;
    var message = "";

    restaurantTable.innerHTML = "";
    totalRest = rest_array.length;
    for (var count = 0; count < totalRest; count++) {
        //compares search value to restaurant array name values, if matches displays the values onto the page
        if (rest_array[count].name.toLowerCase().includes(document.getElementById("searchBar").value.toLowerCase())) {
            var thumbnail = rest_array[count].image;
            if (thumbnail == null) {
                thumbnail = "./assets/placeholder.png";
            }
            var title = rest_array[count].name;
            // }
            var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\
            <h5 style="padding-left:30px;cursor:pointer" id="' + count + '"class="card-title" item="' + count + '" onClick="saveRestaurantDetail(this.id)">' + title + '</h5>\
            </div>'
            restaurantTable.insertAdjacentHTML('afterbegin', cell);
            restCount++;
        }
    }
    message = restCount + " Restaurants total";
    document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}

function filterBy(catergory) {
    catergory = catergory.innerHTML

    var table = document.getElementById("restaurantTable");
    var restCount = 0;
    var message = "";

    restaurantTable.innerHTML = "";
    totalRest = rest_array.length;
    for (var count = 0; count < totalRest; count++) {
        //compares search value to restaurant array cuisine values, if matches displays the values onto the page
        if (rest_array[count].cuisine.toLowerCase().includes(catergory.toLowerCase())) {
            var thumbnail = rest_array[count].image;
            if (thumbnail == null) {
                thumbnail = "./assets/placeholder.png";
            }
            var title = rest_array[count].name;
            // }
            var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\
            <h5 style="padding-left:30px;cursor:pointer" id="' + count + '"class="card-title" item="' + count + '" onClick="saveRestaurantDetail(this.id)">' + title + '</h5>\
            </div>'
            restaurantTable.insertAdjacentHTML('afterbegin', cell);
            restCount++;
        }
    }
    message = restCount + " Restaurants total";
    document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}

function filterByRating(catergory) {
    catergory = catergory.innerHTML

    var table = document.getElementById("restaurantTable");
    var restCount = 0;
    var message = "";

    restaurantTable.innerHTML = "";
    totalRest = rest_array.length;
    for (var count = 0; count < totalRest; count++) {
        //compares search value to restaurant array price values, if matches displays the values onto the page
        if (rest_array[count].price.toLowerCase() == catergory.toLowerCase()) {
            var thumbnail = rest_array[count].image;
            if (thumbnail == null) {
                thumbnail = "./assets/placeholder.png";
            }
            var title = rest_array[count].name;
            // }
            var cell = '<div class="card col-md-3" ><img class="card-img-top" src="' + thumbnail + '" alt="Card image cap">\
            <h5 style="padding-left:30px;cursor:pointer" id="' + count + '"class="card-title" item="' + count + '" onClick="saveRestaurantDetail(this.id)">' + title + '</h5>\
            </div>'
            restaurantTable.insertAdjacentHTML('afterbegin', cell);
            restCount++;
        }
    }
    message = restCount + " Restaurants total";
    document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}