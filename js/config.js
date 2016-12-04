function setConfig(){
    var texts = {
        "title":"Shopping Control"
    }
    document.title = texts.title;
    document.getElementById("navTitle").innerText = texts.title;
}

setConfig();