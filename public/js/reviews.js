function getReviewData() {
    //pulls review data from db and adds to review_array
    var req = new XMLHttpRequest();
    //uses promise to ensure data is passed
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            req.onreadystatechange = (e) => {
                if (req.readyState !== 4) {
                    return;
                }
                if (req.status === 200) {
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

    document.getElementById("emptyReview").innerHTML = "No review";
    count = sessionStorage.getItem("count");
    document.getElementById("reviewRestaurant").innerHTML = "Review for " + rest_array[count].name;

    for (var i = 0; i < review_array.length; i++) {
        if (review_array[i].restaurantID === rest_array[count].restaurantID) {
            //compares rest_array id value to review_array id values, if matches displays the values onto the page
            document.getElementById("emptyReview").innerHTML = "";
            selectedRestaurantID = rest_array[count].restaurantID;
            var submissionDate = new Date(Date.parse(review_array[i].submissionDate));
            // console.log('getUserByID(review_array[i].userID): ', await getUserByID(review_array[i].userID));
            const username = await getUserByID(review_array[i].userID);

            var html = '<div id="reviewCard" class="col text-right" style="max-width: 95%; margin: auto;">\
            <div class="card card-text" style="word-wrap: break-word;">\
            <label style="padding-left:15px;">' + "Title: " + review_array[i].title + '</label>\
            <label style="padding-left:15px;">Rating: </label>\
            <div class="inline-block" style="padding-left:15px;" id="rating' + i + '"></div>\
            <label style="padding-left:15px;" id="reviewBy">By: ' + username.username + ", " + submissionDate + '</label>\
            <div>\
            <br>\
            <div style="padding-left:15px;">Review:</div>\
            <label style="padding-left:15px;" id="reviewContent">' + review_array[i].review + '</label>\
            </div>\
            </div>';
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);

            var rating = "";
            for (var j = 0; j < review_array[i].rating; j++) {
                rating += "<img src='assets/IconFilled.png' style='width:50px' />";
            }
            document.getElementById("rating" + i).insertAdjacentHTML('afterbegin', rating);
        }

    }
}

function getUserByID(reviewID) {
    var req = new XMLHttpRequest();
    //pulls user data from db
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
        //adds review to reviewObject and sends to database
        const userDetails = await getUserDetails();
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

async function updateReview() {
    let formData = new FormData();
    var reviewArray = JSON.parse(sessionStorage.getItem("reviewArray"));
    var count = sessionStorage.getItem("id");

    try {
        //checks if token exists
        if (sessionStorage.getItem("token") != "") {
            //adds update review data to reviewObject and sends to database

            formData.append("token", sessionStorage.getItem("token"));
            formData.append("restaurantID", reviewArray[count].restaurantID);
            formData.append("userID", reviewArray[count].userID);
            formData.append("title", document.getElementById("reviewTitle").value);
            formData.append("rating", rating);
            formData.append("review", document.getElementById("reviewText").value);

            let response = await fetch('http://127.0.0.1:8080/review/' + reviewArray[count].reviewID, {
                method: 'PUT',
                body: formData
            });
            //upon recieving response, shows message and reloads page
            let result = await response.text().then(alert("Review Updated."), window.location.href = window.location.href)
        } else {
            throw "invalid login!"
        }

    } catch (error) {
        alert(error)
    }
}

async function deleteReview() {
    try {
        //checks if token exists
        if (sessionStorage.getItem("token") != "") {
            //if token exists, prompts for user input
            if (confirm('Are you sure you want to delete this review?')) {
                //if user confirms, delete review from database
                var reviewArray = JSON.parse(sessionStorage.getItem("reviewArray"));
                var count = sessionStorage.getItem("id");


                let response = await fetch('http://127.0.0.1:8080/review/' + reviewArray[count].reviewID, {
                    method: 'DELETE',
                });
                //upon recieving response, shows message and reloads page
                let result = await response.text().then(alert("Review Deleted!"), window.location.href = window.location.href)
            } else {
                // Do nothing!
            }

        } else {
            throw "invalid login!"
        }

    } catch (error) {
        alert(error)
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

function displayFilledJar(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", "assets/Icon.png");
    }
    changeJarImage(num, classTarget);
}