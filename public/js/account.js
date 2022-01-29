//const { default: axios } = require("axios");
//const { response } = require("express");

function userLogin() {
    console.log(login_url);
    //gets username and password from textboxes
    var username = document.getElementById("inputUsername").value;
    //sets variable to _ to prevent errors
    if(username == ''){
        username = '_'
    }
    var password = document.getElementById("inputPassword").value;
    //sets variable to _ to prevent errors
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
            sessionStorage.setItem("token", token);
            console.log('sessionStorage: ', sessionStorage);
        }
        console.log('token: ', token);
    };
    loginUser.send();
    // var fuck = axios.create({baseURL: 'http://127.0.0.1:8080'});
    // fuck.get('/login/Ryuuko&1234').then(response=>console.log(response.data))
}