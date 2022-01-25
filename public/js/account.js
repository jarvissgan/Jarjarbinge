function userLogin() {
    console.log(login_url);
    var loginUser = new XMLHttpRequest();

    loginUser.open('POST', "http://127.0.0.1:8080/login", true);
    loginUser.setRequestHeader("Content-Type", "application/json");
    loginUser.onload = function () {
        var token = loginUser.responseText;
        console.log(token);
        token = JSON.parse(token)
        console.log(token.result);
    };
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    var sendString = {
        username: username,
        password: password
    }
    loginUser.send(JSON.stringify(sendString));


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