var profileBlob = null;

async function registerUser() {
    let formData = new FormData(document.getElementById('registerUser'))
    //TODO investigate why its uploading 2 blobs in the payload instead of 1
    formData.append('username', document.getElementById("registerUsername").value);
    formData.append('password', document.getElementById("registerPassword").value);
    formData.append('firstName', document.getElementById("registerFirstName").value);
    formData.append('lastName', document.getElementById("registerLastName").value);
    formData.append('address', document.getElementById("registerAddress").value);
    formData.append('number', document.getElementById("registerPhone").value);
    formData.append('email', document.getElementById("registerEmail").value);
    formData.append('userPicture', profileBlob, 'userPicture');
    
    console.log('formData: ', formData.get('userPicture'));
    let response = await fetch('http://127.0.0.1:8080/user', {
        method: 'POST',
        body: formData
    });
    let result = await response.text().then(userLogin(document.getElementById("registerUsername").value, document.getElementById("registerPassword").value));
    //alert(result);
    console.log('result: ', result);
    
    //GRAVEYARD:

    // document.getElementById('registerUser').onsubmit = async (e) => {
    //     e.preventDefault();
    //     let response = await fetch('http://127.0.0.1:8080/user',{
    //         method: 'POST',
    //         body: new FormData(document.getElementById('registerUser'))
    //     });
    //     let result = await response.json();
    //     alert(result);
    // }
    // const userObject ={

    //     username: document.getElementById("registerUsername").value,
    //     password: document.getElementById("registerPassword").value,
    //     RePassword: document.getElementById("registerRePassword").value,
    //     firstName: document.getElementById("registerFirstName").value,
    //     lastName: document.getElementById("registerLastName").value,
    //     address: document.getElementById("registerAddress").value,
    //     number: document.getElementById("registerPhone").value,
    //     email: document.getElementById("registerEmail").value,
    //     bookmarked: {},
    //     blob: profileBlob
    // };
    // console.log('userObject: ', userObject);
    // var registerUser = new XMLHttpRequest();
    // registerUser.open("POST", "http://127.0.0.1:8080/user", true);
    // registerUser.onload = function () {
    //     console.log(registerUser.responseText);
    // };
    // registerUser.send(formData);


}

function fileConvert() {
    var uploadArray = document.getElementById("userPicture");
    uploadArray.addEventListener("change", function () {
        console.log("ARRAY:", uploadArray.files);
        var reader = new FileReader();
        reader.onload = function (e) {
            //creates blob on file select
            profileBlob = new Blob([new Uint8Array(e.target.result)], {
                //type: uploadArray.files[0].type
                type: "application/json"
            });
            console.log('profileBlob: ', profileBlob);
            console.log(new Uint8Array(e.target.result));
            //converts blob to url, and displays on imageBlob
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(profileBlob);
            document.querySelector("#imageBlob").src = imageUrl;

            console.log("BLOB", profileBlob.arrayBuffer)
        }
        //ignore
        console.log("file", document.getElementById("userPicture").files[0])
        console.log(reader.readAsArrayBuffer(document.getElementById("userPicture").files[0]));
    });
}