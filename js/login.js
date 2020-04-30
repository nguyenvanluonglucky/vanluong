function login(){
    var userName = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    if(userName =="admin" & password =="admin"){
        window.location = "index.html";
        localStorage.setItem("userNow","admin");
    }
    var getDataUserFromStorage = localStorage.getItem("listUser");
    var listUserArr = new Array(0,0);

    if(getDataUserFromStorage!=null){
        listUserArr = JSON.parse(getDataUserFromStorage);
    }
    for (let i = 0; i < listUserArr.length; i++) {
        if(listUserArr[i].user==userName & listUserArr[i].pass==password){
            window.location = "index.html";
            localStorage.setItem("userNow",userName);
            break;
        }
        if(i==listUserArr.length-1){
            const nodeParent = document.getElementById("fail-login");
            var nodeError = document.createElement("div");
            nodeError.classList.add("err-input-login");
            nodeError.style.top =  nodeParent.offsetHeight/2+"px";
            nodeError.style.left = nodeParent.offsetLeft + nodeParent.clientWidth + "px";
            nodeError.innerHTML = "Tên đăng nhập hoặc mật khẩu không đúng";
            nodeParent.appendChild(nodeError);
        }
        
    }
}