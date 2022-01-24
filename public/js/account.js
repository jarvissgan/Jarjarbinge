
function userLogin(){
    const userObject = {
        username: document.getElementById("inputUsername").value,
        password: document.getElementById("inputPassword").value
    };

    console.log(login_url);
    console.log(userObject);

    var req = new XMLHttpRequest();
    req.open('POST', login_url+"?", true);
    req.send();
    var token = req.responseText;
    console.log(token);

    const userAction = async () =>{
        const response = await fetch(login_url);
        const obj = await response.json
    }
}

function fileConvert(){
    const testFileArray = document.getElementById("testFile");
    testFileArray.addEventListener("change", function(){
        console.log("ARRAY:",testFileArray.files);
        var reader = new FileReader();
        reader.onload = function(e){
            //creates blob on file select
            var blob = new Blob([new Uint8Array(e.target.result)], {type: testFileArray.files[0].type});
            console.log(new Uint8Array(e.target.result));
            //converts blob to url, and displays on imageBlob
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            document.querySelector("#imageBlob").src = imageUrl;

            console.log("BLOB",blob.arrayBuffer)
        }
        //ignore
        console.log("file",document.getElementById("testFile").files[0])
        console.log(reader.readAsArrayBuffer(document.getElementById("testFile").files[0]));
    });
}
