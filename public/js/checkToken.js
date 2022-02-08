$(document).ready(async function () { //loads this function everytime the document is loaded
    
    var token = sessionStorage.getItem('token');
    userDetails = await getUserDetails();
    //gets and waits for user details on load

    //console.log('token: ', token);
    if (token != null) {
        //checks if token exists, then changes elements to login state, while also displaying username
        document.getElementById('account').textContent = "Welcome, "+ userDetails.username;
        document.getElementById('register').style.display = "none"
        document.getElementById('login').style.display = "none"
        document.getElementById('account').style.display = "block"
    } else {
        //if token doesn't exist changes elements to logged out state
        document.getElementById('register').style.display = "block"
        document.getElementById('login').style.display = "block"
        document.getElementById('account').style.display = "none"
    }
})