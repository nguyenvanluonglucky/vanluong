function removeAscent (str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
function creatID(){
    var d = new Date();
    var ID =  (d.getTime() + Math.random()).toString();
    ID = ID.replace("0" , "");
    ID = ID.replace("." , "");
    return ID;
}

function NotificationErr(id , notification = ""){
    
    var nodeError = document.createElement("div");
    var iconError =  document.createElement("i");
    iconError.className = "fas fa-exclamation-circle icon-err";
    nodeError.classList.add("err-input-sign-up");
    nodeError.style.top = id.offsetTop +id.parentElement.offsetHeight/2 - id.offsetHeight/2 + 5 + "px";
    nodeError.style.left = id.offsetLeft + id.clientWidth + 30 + "px";
    nodeError.innerHTML = notification;
    id.parentElement.appendChild(nodeError);
    id.parentElement.appendChild(iconError);
    id.addEventListener("input" ,()=>{
        if(nodeError.parentNode!=null){
            nodeError.parentNode.removeChild(nodeError);
        }
        if(iconError.parentNode !=null){
            iconError.parentNode.removeChild(iconError);
        }
        
    });
    return true; 
}