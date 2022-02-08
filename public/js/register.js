var profileBlob = null;

async function registerUser() {
    let formData = new FormData();
    try {
        //checks if entered passwords are the same
        if (document.getElementById("registerPassword").value == document.getElementById("registerRePassword").value) {
            //if same, adds values to formData and sends to database
            formData.append('username', document.getElementById("registerUsername").value);
            formData.append('password', document.getElementById("registerPassword").value);
            formData.append('firstName', document.getElementById("registerFirstName").value);
            formData.append('lastName', document.getElementById("registerLastName").value);
            formData.append('address', document.getElementById("registerAddress").value);
            formData.append('number', document.getElementById("registerPhone").value);
            formData.append('email', document.getElementById("registerEmail").value);
            formData.append('userPicture', document.querySelector("#imageBlob").src);
            
            let response = await fetch('http://127.0.0.1:8080/user', { //await to prevent the page from redirecting before user is registered and logged in
                method: 'POST',
                body: formData
            });
            alert("Registered!")
            //upon sucessful registration, the function to log in is called and the user is redirected to index.
            let result = await response.text().then(userLogin(document.getElementById("registerUsername").value, document.getElementById("registerPassword").value));
        }
    } catch (error) {
        //if registration is invalid, message is shown and page is reloaded to empty elements
        window.location.href = window.location.href
        alert(error);
    }
}

function fileConvert() { //function to convert images to base64
    var uploadArray = document.getElementById("userPicture");
    uploadArray.addEventListener("change", function () {
        //detects if array has changed, if changed performs conversion and displays image
        var selectedFile = uploadArray.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {

            selectedFile.src = e.target.result;
            var srcData = e.target.result;
            document.querySelector("#imageBlob").src = srcData;
        }
        //converts image to base64
        reader.readAsDataURL(selectedFile);
    });

}
