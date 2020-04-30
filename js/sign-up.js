var listUser = new Array();
function resetNotification(){
    let NodeIconERROR = document.querySelectorAll(".icon-err");
    let NodeERROR = document.querySelectorAll(".err-input-sign-up");
    let NodeInPutSignIN = document.querySelectorAll(".in-sign");
    try {
        var err_login = document.querySelector(".err-input-login");
        err_login.parentNode.removeChild(err_login);
    } catch (error) {
        
    }
    for (let i = 0; i < NodeERROR.length; i++) {
        NodeERROR[i].parentNode.removeChild(NodeERROR[i]);
        NodeIconERROR[i].parentNode.removeChild(NodeIconERROR[i]);
        NodeInPutSignIN[i].style.color = "black";
    }

}
function checkTrueFaleForm(){
    resetNotification();
    var check = false;
    var user       = document.getElementById("user-sign");
    var fullName   = document.getElementById("name-sign");
    var pass       = document.getElementById("pass-sign");
    var againPass  = document.getElementById("again-pass-sign");
    var local      = document.getElementById("local-sign");
    var phone      = document.getElementById("phone-sign");
    var email      = document.getElementById("email-sign");
    valueUser= user.value;valueFullName= fullName.value;valuePass= pass.value;valueAgainPass= againPass.value
    valueLocal= local.value;valuePhone= phone.value;valueEmail= email.value


    var testUser = /\w{4,20}$/;
    if(!testUser.test(valueUser) ){
        check=  NotificationErr(user , "Tên không đúng kí tự đặc biệt (4-20 kí tự)");
    }

    listUser = JSON.parse(localStorage.getItem("listUser"));
    if(listUser!=null){
        for (let i = 0; i < listUser.length; i++) {
            if(valueUser==listUser[i].user){
                check =  NotificationErr(user , "Tên Người Dùng này đã tồn tại");
            }     
        }
    }

    var testName = /\w{4,30}$/;
    if(!testName.test(removeAscent(valueFullName))){
        check = NotificationErr(fullName, "tên không được chứa kí tự đặc biệt (4-30  kí tự)");

    }
    if(valuePass.length < 6 || valuePass.length>20){
        check = NotificationErr(pass, "mật khẩu phải từ 6-20  kí tự");
    }

    if(valueAgainPass !=valueAgainPass){
        check = NotificationErr(againPass, "mật khẩu không khớp");
    }

    var testLocal = /\w/;
    if(!testLocal.test(valueLocal)){
        check = NotificationErr(local, "địa không được chứa kí tự đặc biệt");
    }

    var testPhone = /[0-9]{10,11}$/;;
    if(!testPhone.test(valuePhone)){
        check = NotificationErr(phone, "Chỉ chứ số (10-11 số)");
    }

    var testEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!testEmail.test(valueEmail)){
        check = NotificationErr(email, "Vui lòng nhập đúng định dạng email");
    }
    return check;
}


function confirmSignUP(){
    if(!checkTrueFaleForm()){

        var signUpUser = new  Object();
        signUpUser.name = document.getElementById("name-sign").value;
        signUpUser.user = document.getElementById("user-sign").value;
        signUpUser.pass = document.getElementById("pass-sign").value;
        signUpUser.local = document.getElementById("local-sign").value;
        signUpUser.phone = document.getElementById("phone-sign").value;
        signUpUser.email = document.getElementById("email-sign").value;
        
        listUser = JSON.parse(localStorage.getItem("listUser"));
        notificationOK();
        if(listUser==null) listUser = new Array();
        listUser.push(signUpUser);

        localStorage.setItem("listUser" , JSON.stringify(listUser));
    }
}
function notificationOK(){
    var notification_OK = document.createElement('h1');
    notification_OK.className = "notinationOK";
    notification_OK.innerHTML = "Đăng Kí Thành Công";
    document.querySelector("body").appendChild(notification_OK);

    setTimeout(()=>{
        notification_OK.innerHTML = "";
        document.querySelector("body").removeChild(notification_OK);
        optionLogin_Sign(1,2);
    },2000)
}


function optionLogin_Sign(a,b){
    resetNotification();
    document.querySelector(".all").classList.add("animationall");
    setTimeout(()=>{
        document.querySelector(".all-frame-sign-up").style.zIndex = a;
        document.querySelector(".all-frame-log-in").style.zIndex = b;
    },700);
    setTimeout(()=>{
        document.querySelector(".all").classList.remove("animationall");
    },1500);
}
