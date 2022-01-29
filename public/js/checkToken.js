$(document).ready(function () {
    var token = sessionStorage.getItem('token');
    //console.log('token: ', token);
    if (token != null) {
        document.getElementById('register').style.display = "none"
        document.getElementById('login').style.display = "none"
        document.getElementById('account').style.display = "block"
    } else {
        document.getElementById('register').style.display = "block"
        document.getElementById('login').style.display = "block"
        document.getElementById('account').style.display = "none"
    }
})