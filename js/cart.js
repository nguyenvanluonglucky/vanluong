getData();
function findProductWithID(id) {
    var listProduct = JSON.parse(localStorage.getItem("listProduct"));
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].id == id) {
            return  listProduct[i];
        }
    }
}
function getData(){
    showUser();
    var ArrayNeedOutPut = new Array();
    var ListCart = JSON.parse(localStorage.getItem("listCart"));
    if(ListCart!=null){
        for (let i = 0; i < ListCart.length; i++) {
            var product = findProductWithID(ListCart[i].id);
            product.sl = ListCart[i].sl;
            product.check = ListCart[i].check;
            ArrayNeedOutPut.push(product);
        }
    }
    outPutProductCart(ArrayNeedOutPut);
}

function outPutProductCart(inputListProduct){
    var full = document.getElementById("product-cart");
    full.innerHTML = "";
    if(inputListProduct.length ==0){
        full.innerHTML = "<h1>Giỏ hàng trống!!!!</h1>";
    }
    var ReturnListProduct = new Array();
    for (let i = 0; i < inputListProduct.length; i++) {
        var frameProduct = document.createElement("div");
        frameProduct.className = "fram-product";
        full.appendChild(frameProduct);
        frameProduct.id = inputListProduct[i].id;

        var farmeCheckBox = document.createElement("div");
        farmeCheckBox.className = "frame-checbox";
        frameProduct.appendChild(farmeCheckBox);

        var farmImg = document.createElement("div");
        farmImg.className = "frame-img";
        frameProduct.appendChild(farmImg);

        var frameName = document.createElement("div");
        frameName.className = "frame-name";
        frameProduct.appendChild(frameName);

        var nameProduct = document.createElement("div");
        nameProduct.className = "name-product";
        frameName.appendChild(nameProduct);

        var removeProductCart = document.createElement("div");
        frameName.appendChild(removeProductCart);
        removeProductCart.innerHTML = '<button class="frame-remove" onclick="removeCart(this)"><i class="fas fa-trash-alt"></i></button>';

        var frameNumber = document.createElement("div");
        frameNumber.className = "frame-number-money";
        frameProduct.appendChild(frameNumber);

        var frameMoney =  document.createElement("div");
        frameMoney.className = "frame-money";
        frameNumber.appendChild(frameMoney);
        var sale = document.createElement("div");
        sale.className = "sale";
        frameMoney.appendChild(sale);
        var money = document.createElement("div");
        money.className = "money";
        frameMoney.appendChild(money);

        var frameInput =  document.createElement("div");
        frameInput.className = "frame-sl";
        frameNumber.appendChild(frameInput);
        
        HTMLFrameInput = '<button class="reduction"  onclick="ChangeSLCart(-1,this)">-</button>'
        HTMLFrameInput +='<input type="text"  value="'+inputListProduct[i].sl+'"  onchange="ChangeSLCartWithForm(this)">';
        HTMLFrameInput += '<button class="reduction"  onclick="ChangeSLCart(+1,this)">+</button>';
        frameInput.innerHTML = HTMLFrameInput;

        ReturnListProduct[i] = Product(inputListProduct[i].id,inputListProduct[i].name,inputListProduct[i].img,inputListProduct[i].money*1,inputListProduct[i].percentSale*1, inputListProduct[i].type);
        ReturnListProduct[i].sl = inputListProduct[i].sl*1;
        ReturnListProduct[i].check = inputListProduct[i].check;

        farmImg.style.backgroundImage = ReturnListProduct[i].outPutImg();
        farmImg.style.backgroundSize = "100%";
        nameProduct.innerHTML = ReturnListProduct[i].name;
        
        sale.innerHTML = ReturnListProduct[i].outPutSale();
        money.innerHTML = ReturnListProduct[i].outPutMoney();
        farmeCheckBox.innerHTML = '<input type="checkbox" onchange="ChangeCheck(this)">';
        frameProduct.style.opacity = '0.6';
        frameProduct.style.boxShadow  = '0px 0px 0px ';
        if(inputListProduct[i].check == true){
            farmeCheckBox.innerHTML = '<input type="checkbox" checked ="on" onchange="ChangeCheck(this)">';
            frameProduct.style.opacity = '1';
            frameProduct.style.boxShadow  = '0px 0px 15px rgb(110, 110, 110)';

        }


        //
    }
    document.getElementById("sum-money").innerHTML = "Tổng tiền : " + SumMoney(ReturnListProduct);
    document.getElementById("sum-cart").innerHTML = "Tổng số lượng đơn hàng : "+ sumSl(ReturnListProduct);
    
}



function SumMoney(ReturnListProduct){
    var sumMoney = 0;
    for (let i = 0; i < ReturnListProduct.length; i++) {
        if(ReturnListProduct[i].check == true){
            sumMoney = sumMoney + (ReturnListProduct[i].money *(100-ReturnListProduct[i].percentSale)/100)*ReturnListProduct[i].sl;
        }
    }
    return sumMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
    
}

function sumSl(ReturnListProduct){
    var sumSl =0;
    for (let i = 0; i < ReturnListProduct.length; i++) {
        if(ReturnListProduct[i].check == true) sumSl += ReturnListProduct[i].sl;
    }
    return sumSl;
}

function removeCart(id){
    var listCart = JSON.parse(localStorage.getItem("listCart"));
    for (let i = 0; i < listCart.length; i++) {
        if(id.parentNode.parentNode.parentNode.id== listCart[i].id)listCart.splice(i,1);
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
    getData();
}

function ChangeSLCart(sl, id){
    id  = id.parentNode.parentNode.parentNode.id;
    var listCart = JSON.parse(localStorage.getItem("listCart"));
    for (let i = 0; i < listCart.length; i++) {
        if(id==listCart[i].id){
            listCart[i].sl = listCart[i].sl + sl*1;
            if(listCart[i].sl<0) listCart[i].sl =0;
        }
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
    getData();
}

function resetNotification(){
    let NodeERROR = document.querySelectorAll(".ERROR");
    for (let i = 0; i < NodeERROR.length; i++) {
        NodeERROR[i].innerHTML = "";
    }
}
function checkErrorInputInfo(){
    resetNotification();
    var name = document.getElementById("input-name").value;
    var phone = document.getElementById("input-phone").value;
    var email = document.getElementById("input-email").value;
    var local = document.getElementById("input-local").value;
    var order = document.getElementById("sum-cart").innerHTML;
    var check = true;
    //fix bug
    order = order.replace("Tổng số lượng đơn hàng : ", "");
    order *=1;

    var testName = /[A-Za-z]{4,30}$/;
    if(!testName.test(removeAscent(name))){
        check = false;
        document.getElementById("err-name").innerHTML = "Tên không chứa kí tự đặc biệt (kí tự từ 4-30)";
    }
    var testPhone = /^[0-0]{1,1}[0-9]{9,10}$/;
    if(!testPhone.test(phone)){
        document.getElementById("err-phone").innerHTML = "Vui lòng nhập đúng dạng số điện thoại";
        check = false;
    }
    var testEmail =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!testEmail.test(email)){
        document.getElementById("err-email").innerHTML = "Vui lòng nhập đúng định dạng email";
        check = false;
    }
    if(order==0){
        document.getElementById("err-order").innerHTML = "Chưa có đơn hàng nào !!";
        check = false;
    }
    let nodeErr = document.querySelectorAll(".ERROR");
    let nodeInput = document.querySelectorAll(".input-info input");
    for (let i = 0; i < nodeErr.length-1; i++) {
        if(nodeInput[i].value == ""|| nodeInput[i].value == null){
            nodeErr[i].innerHTML = "Không được để trống ô này !!";
        }    
    }
    return check;
}


 function testLogin(){
    var getUserNow = localStorage.getItem("userNow");
    var listUser = JSON.parse(localStorage.getItem("listUser"));
    
    if(getUserNow != null){
        var name = document.getElementById("input-name");
        var phone = document.getElementById("input-phone");
        var email = document.getElementById("input-email");
        var local = document.getElementById("input-local");

        for (let i = 0; i < listUser.length; i++) {
            if(getUserNow==listUser[i].user){
                name.value  = listUser[i].name;
                phone.value = listUser[i].phone;
                email.value = listUser[i].email;
                local.value = listUser[i].local;
            }
        }
    }
 }

 function ChangeSLCartWithForm(id){
    var ValueID = id.value;
    id = id.parentNode.parentNode.parentNode.id;
    var listCart = JSON.parse(localStorage.getItem("listCart"));
    for (let i = 0; i < listCart.length; i++) {
        if(listCart[i].id==id){
            listCart[i].sl = ValueID;
            listCart[i].sl*=1;
        }
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
    getData();
 }

 function order(){
    if(checkErrorInputInfo()==true){
        thongKeOrder();
        localStorage.setItem("listCart", null);
        getData();
        document.getElementById("product-cart").innerHTML = "<h1>ĐƠN HÀNG ĐANG ĐƯỢC GIAO!!!</h1>";
    }
    
 }

 function thongKeOrder(){
    var name = document.getElementById("input-name").value;
    var phone = document.getElementById("input-phone").value;
    var email = document.getElementById("input-email").value;
    var local = document.getElementById("input-local").value;
    var order = document.getElementById("sum-cart").innerHTML;
    var listOrder = JSON.parse(localStorage.getItem("listOrder"));
    var listCart = JSON.parse(localStorage.getItem("listCart"));
    if(listOrder==null) listOrder = new Array();

    var Order = new Object();
    Order.name = name;
    Order.phone = phone;
    Order.email = email;
    Order.local = local;
    Order.order = order;
    Order.listCart = listCart;

    listOrder.push(Order);
    
    localStorage.setItem("listOrder", JSON.stringify(listOrder));
 }

 function ChangeCheck(idNode = document.getElementById("fd")){
    var listCart = JSON.parse(localStorage.getItem("listCart"));
    for (let i = 0; i < listCart.length; i++) {
        if(listCart[i].id == idNode.parentNode.parentNode.id) {
            if(!idNode.checked){
                listCart[i].check = false;
                break;
            }
            else listCart[i].check = true;
        } 
    }
    localStorage.setItem("listCart", JSON.stringify(listCart));
    getData();
 }

 function findMoney(){
    let start = document.getElementById('filter-start-money').value;
    let end = document.getElementById('filter-end-money').value;
    
    let listCart = JSON.parse(localStorage.getItem('listCart'));
    if(start!='' & end !=''){
        for (let i = 0; i < listCart.length; i++) {
            console.log(listCart[i].id);
            let product = findProductWithID(listCart[i].id);
            if(product!=undefined){
                document.getElementById(product.id).style.background = 'white';
                if(product.money*((100-product.percentSale)/100) > start & product.money*((100-product.percentSale)/100)< end){
                    document.getElementById(product.id).style.background = 'rgb(72, 173, 219)';
                }
            }
        }
    }
 }