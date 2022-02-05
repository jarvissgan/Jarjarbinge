function getReviewData() {
    //pulls review data from db and adds to review_array
    var req = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        setTimeout(function () {
            req.onreadystatechange = (e) => {
                if (req.readyState !== 4) {
                    return;
                }
                if (req.status === 200) {
                    // console.log("success", req.responseText);
                    resolve(JSON.parse(req.responseText));
                } else {
                    console.warm('request_error');
                }
            };
            req.open('GET', "http://127.0.0.1:8080/review");
            req.send();
        }, 0)
    });
}

async function displayReviews() {
    rating = 0;
    //rest_array = rest_array;
    review_array = await getReviewData();
    // console.log('review_array: ', review_array);

    document.getElementById("emptyReview").innerHTML = "No review";
    count = sessionStorage.getItem("count");
    document.getElementById("reviewRestaurant").innerHTML = "Review for " + rest_array[count].name;

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].restaurantID === rest_array[count].restaurantID) {

            // console.log(review_array[i]);
            document.getElementById("emptyReview").innerHTML = "";
            selectedRestaurantID = rest_array[count].restaurantID;
            star = "";
            var submissionDate = new Date(Date.parse(review_array[i].submissionDate));
            // console.log('getUserByID(review_array[i].userID): ', await getUserByID(review_array[i].userID));
            const username = await getUserByID(review_array[i].userID);

            var html = '<div id="reviewCard" class="col text-right" style="max-width: 95%; margin: auto;">\
            <div class="card card-text" style="word-wrap: break-word;">\
            <label style="padding-left:15px;cursor:pointer" id="reviewName">' + review_array[i].title + '</label>\
            <label style="padding-left:15px;cursor:pointer" id="reviewBy">By: ' + username.username + ", " + submissionDate + '</label>\
            <div>\
            <img src="assets/Icon.png" class="jar" value="1" style="cursor:pointer">\
                    <img src="assets/Icon.png" class="jar" value="2" style="cursor:pointer">\
                    <img src="assets/Icon.png" class="jar" value="3" style="cursor:pointer">\
                    <img src="assets/Icon.png" class="jar" value="4" style="cursor:pointer">\
                    <img src="assets/Icon.png" class="jar" value="5" style="cursor:pointer">\
            </div>\
            <label style="padding-left:15px;cursor:pointer" id="reviewContent">' + review_array[i].review + '</label>\
            </div>\
            </div>';
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);
        }

    }


}


function getUserByID(reviewID) {
    var req = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        setTimeout(function () {
            req.onreadystatechange = (e) => {
                if (req.readyState !== 4) {
                    return;
                }
                if (req.status === 200) {
                    // console.log("success", req.responseText);
                    resolve(JSON.parse(req.responseText));
                } else {
                    console.warm('request_error');
                }
            };
            req.open('GET', "http://127.0.0.1:8080/review/" + reviewID);
            req.send();
        }, 10)
    });

}

async function addReview() {
    //if token exists
    if (sessionStorage.getItem("token")) {
        const userDetails = await getUserDetails();
        // console.log('userDetails: ', userDetails);
        var reviewObject = new Object();

        reviewObject.restaurantID = rest_array[sessionStorage.getItem("count")].restaurantID;
        reviewObject.userID = userDetails.userID;
        reviewObject.title = document.getElementById("reviewTitle").value;
        reviewObject.review = document.getElementById("reviewText").value;
        reviewObject.rating = rating;
        // console.log('reviewObject: ', reviewObject);

        var req = new XMLHttpRequest();
        req.open('POST', "http://127.0.0.1:8080/review", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.onload = function () {
            var response = JSON.parse(req.responseText);
            // console.log('response: ', response);
        }
        req.send(JSON.stringify(reviewObject));

        //refreshes reviews to load new comment
        window.location.href = window.location.href;
    } else { //if token doesn't exist
        alert("Please log in!");
        document.getElementById("reviewTitle").value = '';
        document.getElementById("reviewText").value = '';
    }


}

function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var jarRates = document.getElementsByClassName(classname);
    var classTarget = '.' + classname;
    for (let jarRate of jarRates) {
        jarRate.setAttribute("src", "assets/Icon.png")
    }
    changeJarImage(num, classTarget);
}

function changeJarImage(num, classTarget) {
    // console.log('num: ', num);
    // console.log('classTarget: ', classTarget);
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "assets/IconFilled.png");
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='2']").setAttribute("src", "assets/IconFilled.png");
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='2']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='3']").setAttribute("src", "assets/IconFilled.png");
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='2']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='3']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='4']").setAttribute("src", "assets/IconFilled.png");
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='2']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='3']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='4']").setAttribute("src", "assets/IconFilled.png");
            document.querySelector(classTarget + "[value='5']").setAttribute("src", "assets/IconFilled.png");
            rating = 5;
            break;
    }
}

var wordLimit = 150;
var count = 0;

function countWord() {
    var words = document.getElementById("reviewText").value;
    // console.log('words: ', words);

    // Split the words on each
    // space character
    var split = words.split(' ');
    // Loop through the words and
    // increase the counter when
    // each split word is not empty
    for (var i = 0; i < split.length; i++) {
        if (split[i] != "") {
            count += 1;
        }
    }
    // Get the input text value

}