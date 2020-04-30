showUser();
function showUser(){
    showSLCart();
    var getUserFromStorage = localStorage.getItem("userNow");
    document.getElementById("icon-ac-login").style.display = "none";
    document.getElementById("icon-ac-logout").style.display = "block";
    if(getUserFromStorage ==null||getUserFromStorage ==""){
        if(getUserFromStorage=="admin"){
            document.getElementById("admin-on-menu").style.display = "block";
        }
        else{
        document.getElementById("icon-ac-login").style.display = "block";
        document.getElementById("icon-ac-logout").style.display = "none";
        document.getElementById("show-user-on-menu").innerHTML = "Tài Khoản";
        }
    }
    else{
        document.getElementById("show-user-on-menu").innerHTML = getUserFromStorage;       
    }
}


function logout(){
    localStorage.setItem("userNow", "");
    showUser();
}

function showSLCart(){
    var getSl = JSON.parse(localStorage.getItem("listCart"));
    if(getSl!=null){
        document.getElementById("sl-on-menu").innerHTML=getSl.length;
    }
}







function showTutorial(idNode =document.getElementById("fds")){
    var boxTutorial = idNode.parentNode.querySelector("div");
    if(boxTutorial.style.display  == "block"){
        boxTutorial.style.display  = 'none';
    }
    else boxTutorial.style.display  = 'block';
}