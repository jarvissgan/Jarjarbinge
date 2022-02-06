//userLogin(username, password) so that i can login without typing out another query in other js files :D
function userLogin(username, password) {
    try {
        if (username == "" || password == "") {
            throw "invalid login, please try again"
        } else {
            //creates new XMLHttpRequest
            var req = new XMLHttpRequest();
            //opens request with login url from app,js, and username&password
            req.open("GET", "http://127.0.0.1:8080/login/" + username + '&' + password, true);
            req.setRequestHeader("Content-Type", "application/json");
            req.onload = function () {
                //gets token from userDB and parses json
                var token = req.responseText;
                token = JSON.parse(token).result;
                //adds token to session storage if it is valid
                if (token != 'invalid') {
                    //adds token to session storage if token is returned
                    sessionStorage.setItem("token", token);

                    //changes page to last visited page and refreshes the page
                    window.location.replace("index.html");
                    window.onload = function () {
                        window.location.reload();
                    }
                } else {
                    //if login is invalid, refreshes page to make user login again
                    alert("Invalid username or password, please try again");
                    window.location.href = window.location.href

                }
            };
            req.send();
        }

    } catch (error) {
        alert(error);
        window.location.href = window.location.href
    }

}

function logoutUser() {
    sessionStorage.removeItem("token");
    window.location.replace('index.html')
}

function getUserDetails() {
    var req = new XMLHttpRequest();

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
            req.open('GET', "http://127.0.0.1:8080/user/get/" + sessionStorage.getItem("token"));
            req.send();
        }, 0)
    });
}

async function accountDetails() {
    var userArray = await getUserDetails()

    document.getElementById("updateUsername").value = userArray.username;
    document.getElementById("updateFirstName").value = userArray.firstName;
    document.getElementById("updateLastName").value = userArray.lastName;
    document.getElementById("updateAddress").value = userArray.address;
    document.getElementById("updatePhone").value = userArray.number;
    document.getElementById("updateEmail").value = userArray.email;
    document.querySelector("#imageBlob").src = userArray.userPicture;
}

async function updateUser() {
    let formData = new FormData();
    try {

        if (document.getElementById("updatePassword").value == document.getElementById("updateRePassword").value) {
            formData.append('token', sessionStorage.getItem('token'));
            formData.append('username', document.getElementById("updateUsername").value);
            formData.append('password', document.getElementById("updatePassword").value);
            formData.append('firstName', document.getElementById("updateFirstName").value);
            formData.append('lastName', document.getElementById("updateLastName").value);
            formData.append('address', document.getElementById("updateAddress").value);
            formData.append('number', document.getElementById("updatePhone").value);
            formData.append('email', document.getElementById("updateEmail").value);
            formData.append('userPicture', document.querySelector("#imageBlob").src);

            let response = await fetch('http://127.0.0.1:8080/user', {
                method: 'PUT',
                body: formData
            });
            let result = await response.text().then(alert("Details Updated"), window.location.href = window.location.href);


        } else {
            throw "Passwords are not the same! Please re-enter passwords"
        }

    } catch (error) {
        alert(error);
        document.getElementById("updatePassword").value = "";
        document.getElementById("updateRePassword").value = "";
    }

}

async function deleteUser() {
    var answer = window.confirm("Are you sure? This cannot be undone.");
    if (answer) {
        userArray = await getUserDetails();
        var req = new XMLHttpRequest();

        req.open("DELETE", "http://127.0.0.1:8080/user/" + userArray.userID, true);
        req.onload = function () {
            //gets token from userDB and parses json
            alert("Account deleted. Redirecting to home page...");
            sessionStorage.removeItem("token");

            window.location.replace("index.html");
        };
        req.send();
    }
}

async function loadProfile() {
    var userArray = await getUserDetails();
    //get user details and display on profile
    document.querySelector("#imageBlob").src = userArray.userPicture;
    document.getElementById("profileUsername").innerHTML = "Username: " + userArray.username;
    document.getElementById("profileFirstLastName").innerHTML = "Name: " + userArray.firstName + " " + userArray.lastName;
    document.getElementById("profileAddress").innerHTML = "Address: " + userArray.address;
    document.getElementById("profileNumber").innerHTML = "Phone Number: " + userArray.number;
    document.getElementById("profileEmail").innerHTML = "Email: " + userArray.email;
    document.getElementById("reviewBy").innerHTML = "Reviews By: " + userArray.username;

    //get comments to display on profile
    var reviewArray = await getReviewData();

    rating = 0;
    document.getElementById("emptyReview").innerHTML = "No review";
    sessionStorage.setItem("reviewArray", JSON.stringify(reviewArray))

    for (var i = 0; i < reviewArray.length; i++) {
        if (reviewArray[i].userID === userArray.userID) {
            document.getElementById("emptyReview").innerHTML = "";
            star = "";
            var submissionDate = new Date(Date.parse(reviewArray[i].submissionDate));
            var username = userArray.username;

            var html = '<div id="reviewCard" class="col text-right" style="max-width: 95%; margin: auto;">\
            <div class="card card-text" style="word-wrap: break-word;">\
            <label style="padding-left:15px;">' + "Title: " + reviewArray[i].title + '</label>\
            <label style="padding-left:15px;">Rating: </label>\
            <div class="inline-block" style="padding-left:15px;" id="rating' + i + '"></div>\
            <label style="padding-left:15px;" id="reviewBy">By: ' + username + ", " + submissionDate + '</label>\
            <div>\
            <br>\
            <div style="padding-left:15px;">Review:</div>\
            <label style="padding-left:15px;" id="reviewContent">' + reviewArray[i].review + '</label>\
            <div><input type="button" id="' + i + '"value="Edit Review" data-toggle="modal" data-target="#reviewModal" data-dismiss="modal" onclick="populateModal(this.id)"></div>\
            </div>\
            </div>';
            document.getElementById("reviewBody").insertAdjacentHTML('beforeend', html);
            var rating = "";
            for (var j = 0; j < reviewArray[i].rating; j++) {
                rating += "<img src='assets/IconFilled.png' style='width:50px' />";
            }
            document.getElementById("rating" + i).insertAdjacentHTML('afterbegin', rating);
        }
    }

}

function populateModal(id) {
    var rest_array = JSON.parse(sessionStorage.getItem("restaurantArray"));
    var reviewArray = JSON.parse(sessionStorage.getItem("reviewArray"));

    for (var count = 0; count < rest_array.length; count++) {
        if (rest_array[count].restaurantID == reviewArray[id].restaurantID) {
            sessionStorage.setItem("id", id);
            document.getElementById("modalRestaurantName").innerHTML = "Review for: " + rest_array[count].name;

            document.getElementById("modalRestaurantName").value = reviewArray[id].restaurantID;
            document.getElementById("reviewTitle").value = reviewArray[id].title;
            document.getElementById("reviewText").value = reviewArray[id].review;
            document.getElementById("modalTime").innerHTML = "Time of review: " + new Date(Date.parse(reviewArray[id].submissionDate));
            displayFilledJar("editJar", reviewArray[id].rating);
        }
    }

}