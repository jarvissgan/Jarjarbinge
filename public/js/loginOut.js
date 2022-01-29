//userLogin(username, password) so that i can login without typing out another query in other js files :D
function userLogin(username, password) {
    console.log(login_url);
    // //sets variable to _ to prevent errors
    if(username == ''){
        username = '_'
    }
    // //sets variable to _ to prevent errors
    if(password == ''){
        password = '_'
    }
    //creates new XMLHttpRequest
    var loginUser = new XMLHttpRequest();
    //TODO: AXIOS
    //opens request with login url from app,js, and username&password
    loginUser.open("GET", "http://127.0.0.1:8080"+login_url+username+'&'+password, true);
    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload = function () {
        //gets token from userDB and parses json
        var token = loginUser.responseText;
        token = JSON.parse(token).result;
        //adds token to session storage if it is valid
        if(token != 'invalid'){
            //adds token to session storage if token is returned
            sessionStorage.setItem("token", token);
            console.log('sessionStorage: ', sessionStorage);

            //changes page to last visited page
            window.location.replace(document.referrer)
        }
        else{
            console.log('token: ', token);
            alert("Entered wrong username or password!")
        }
    };
    loginUser.send();
}
function logoutUser(){
    sessionStorage.removeItem("token");
    window.location.replace('index.html')
}