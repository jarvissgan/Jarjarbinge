//var file = document.getElementById("testFile");

function imageURL(testFile1){
    var image = testFile1[0];
    console.log(image);
    var reader = new FileReader();
    reader.onload = function(e){
        var blob = new Blob([new Uint8Array(e.target.result)], {type: files.type});
        console.log(blob)
    }
    console.log(reader.readAsArrayBuffer(image));

}


