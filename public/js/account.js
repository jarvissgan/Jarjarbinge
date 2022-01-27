//const { default: axios } = require("axios");
//const { response } = require("express");


function userLogin() {
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    
    console.log(login_url);
    var loginUser = new XMLHttpRequest();
    //TODO: AXIOS
    //loginUser.open("POST", "http://127.0.0.1:8080/login", true);
    loginUser.open("GET", "http://127.0.0.1:8080/login/"+username+'&'+password, true);

    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload = function () {
        var token = loginUser.responseText;
        console.log('token: ', token);
        // var token = JSON.parse(token)
        // console.log(token.result);
    };

    // var sendString = {
    //     username: username,
    //     password: password
    // }
    //loginUser.send(JSON.stringify(sendString));
    loginUser.send();
    // var fuck = axios.create({baseURL: 'http://127.0.0.1:8080'});
    // fuck.get('/login/Ryuuko&1234').then(response=>console.log(response.data))

}

function fileConvert() {
    const testFileArray = document.getElementById("testFile");
    testFileArray.addEventListener("change", function () {
        console.log("ARRAY:", testFileArray.files);
        var reader = new FileReader();
        reader.onload = function (e) {
            //creates blob on file select
            var blob = new Blob([new Uint8Array(e.target.result)], {
                type: testFileArray.files[0].type
            });
            console.log(new Uint8Array(e.target.result));
            //converts blob to url, and displays on imageBlob
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            document.querySelector("#imageBlob").src = imageUrl;

            console.log("BLOB", blob.arrayBuffer)
        }
        //ignore
        console.log("file", document.getElementById("testFile").files[0])
        console.log(reader.readAsArrayBuffer(document.getElementById("testFile").files[0]));
    });
}