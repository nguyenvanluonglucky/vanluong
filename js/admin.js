function outIndex(){
    var listProduct = new Array();
    var getDataFormStorage = localStorage.getItem("listProduct");
    listProduct = JSON.parse(getDataFormStorage);
    outPutProduct(listProduct);
}
function Product(){
    var product = new Object();
    product.id = "";
    product.name = "";
    product.img = "";
    product.money = 0;
    product.percentSale = 0;
    product.type = "";
    product.outPutImg = function(){
        return 'url(\"'+this.img+'\")';
    }
    product.outPutMoney  = function(){
        this.money = Math.round(this.money);
        if(this.money ==0){
            return this.money = "";
        }
        else{
            return this.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
        }
    }
    product.outPutSale = function(){
        this.money = this.money*1;
        if(this.money==0){
            return this.sale = "Miễn Phí";
        }
        else{
            var sale = this.money*(100 - this.percentSale)/100;
            sale = Math.round(sale);
            return sale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
        }
    }
    return product;
}
function outPutProduct(ArrListProduct){
    var full = document.getElementById("all-edit-product");
    full.innerHTML = `<div id="add-product" class="frames-product" onclick="showAddProduct(-1)">
                        <i class="fas fa-plus-square"></i>
                    </div>`;
    var ReturnlistProduct = new Array();
    for (let i = 0; i < ArrListProduct.length; i++) {
        var FullframeProduct = document.createElement("div");
        FullframeProduct.className = "full-frames-product";
        full.appendChild(FullframeProduct);

        var frameProduct = document.createElement("div");
        frameProduct.className = "frames-product";
        FullframeProduct.appendChild(frameProduct);

        var frameImgProduct = document.createElement("div");
        frameImgProduct.className = "fram-img-product";
        frameProduct.appendChild(frameImgProduct);

        var contentProduct = document.createElement("div");
        contentProduct.className = "content-product";
        frameProduct.appendChild(contentProduct);

        var nameProduct = document.createElement("div");
        nameProduct.className = "name-product";
        contentProduct.appendChild(nameProduct);

        var saleProduct = document.createElement("div");
        saleProduct.className = "sale-product";
        contentProduct.appendChild(saleProduct);

        var moneyProduct = document.createElement("div");
        moneyProduct.className = "money-product";
        contentProduct.appendChild(moneyProduct);

        var seeMore = document.createElement("div");
        frameProduct.appendChild(seeMore);

        //fixbug dcmm
        ReturnlistProduct[i] = Product();
        ReturnlistProduct[i].name        = ArrListProduct[i].name;
        ReturnlistProduct[i].id          = ArrListProduct[i].id;
        ReturnlistProduct[i].money       = ArrListProduct[i].money;
        ReturnlistProduct[i].percentSale = ArrListProduct[i].percentSale;
        ReturnlistProduct[i].img = ArrListProduct[i].img;


        //tạo nội dung cho sản phẩm
        frameImgProduct.style.backgroundImage = ReturnlistProduct[i].outPutImg();
        frameImgProduct.style.backgroundSize = "100%";
        frameImgProduct.style.backgroundRepeat = "no-repeat"

        nameProduct.append(ReturnlistProduct[i].name);
        saleProduct.append(ReturnlistProduct[i].outPutSale());
        moneyProduct.append( ReturnlistProduct[i].outPutMoney());

        seeMore.innerHTML = '<button class="edit-products" onclick="showAddProduct(\''+ReturnlistProduct[i].id+'\')">Edit</button>';
    }
}


function hideFrameEdit(){
    document.getElementById("background-edit").style.display = "none";
    document.querySelector("section").style.animation = "";
    document.querySelector("section").style.filter  = "blur(0px)";
    document.querySelector("section").style.zIndex = "1";
}
function resetFormEdit(){
    document.getElementById("background-edit").style.height = 440+ 'px';
    document.getElementById("input-name").value = null;
    document.getElementById("input-money").value = null;
    document.getElementById("input-sale").value = null;
    document.getElementById("input-link").value = null;
    document.getElementById("input-type").value = 0;
}
function showAddProduct(id){
    resetFormEdit();
    document.querySelector("section").style.filter  = "blur(5px)";
    document.querySelector("section").style.zIndex = "-1";
    document.getElementById("background-edit").style.display = "block";
    document.querySelector("section").style.animation = "blurSection 2s";
    document.getElementById("ok").innerHTML = '<button onclick="addProduct(-1)">Thêm</button>';
    document.getElementById("header-frame-edit").innerHTML = "thêm sản phẩm";
    if(id>=0){
        document.getElementById("header-frame-edit").innerHTML = "cập nhật";
        var outPutToOK = '<button onclick="addProduct('+id+')">Cập nhật</button>';
        outPutToOK = outPutToOK + '<button class="Btdelete" onclick="deleteProduct('+id+')">Xóa SP</button>'
        document.getElementById("ok").innerHTML = outPutToOK;

        var getDataFromStorage = localStorage.getItem("listProduct");
        var changeJsonToArr = JSON.parse(getDataFromStorage);
        var listProduct = new Array();
        listProduct = changeJsonToArr;

        if(id>0){
            for (let i = 0; i < listProduct.length; i++) {
                if(listProduct[i].id==id){
                    var saveID = listProduct[i];
                }
            }
        }

        document.getElementById("input-name").value  = saveID.name;
        document.getElementById("input-money").value = saveID.money;
        document.getElementById("input-sale").value  = saveID.percentSale;
        document.getElementById("input-link").value  = saveID.img;
        document.getElementById("input-type").value  = saveID.type;
    }
}
function checkFormEdit(){
    var nameProduct = document.getElementById("input-name").value;
    var moneyProduct = document.getElementById("input-money").value;
    var saleProduct = document.getElementById("input-sale").value;
    var linkProduct = document.getElementById("input-link").value;
    var typeProduct = document.getElementById("input-type").value;
    var check = true;
    if(nameProduct == "" || nameProduct ==null){
        document.getElementById("err-name").innerHTML = "Không được để trống tên sản phẩm";
        check = false;
    }
    moneyProduct = Math.round(Math.abs(moneyProduct));
    if(moneyProduct  > 500000000){
        document.getElementById("err-money").innerHTML = "Giá trị sản phẩm không quá 500 triệu";
        check = false;
    }
    saleProduct = Math.abs(saleProduct);
    if(saleProduct  > 100){
        document.getElementById("err-sale").innerHTML = "Phần trăm giảm giá không quá 100%";
        check = false;
    }
    if(linkProduct == "" || linkProduct ==null){
        document.getElementById("err-link").innerHTML = "Không được để trống link ảnh sản phẩm";
        check = false;
    }
    if(typeProduct=="0"){
        document.getElementById("err-type").innerHTML = "Vui lòng phân loại sản phẩm";
        check = false;
    }
    return check;

}
function checkIMG(idNode = document.getElementById("gfd")){
    
    document.getElementById("background-edit").style.height = 440+ 'px';
    getLinkImg =  idNode.value;
    var fromShowImg = document.querySelector("#show-img-product .frame-check-img");
    fromShowImg.innerHTML = '';
    fromShowImg.innerHTML = '<img src="'+getLinkImg+'" alt="">';
    document.getElementById("background-edit").style.height = 600+ 'px';
}


function addProduct(id){
    var getDataFromStorage = localStorage.getItem("listProduct");
    var changeJsonToArr = JSON.parse(getDataFromStorage);
    var listProduct = new Array();
    listProduct = changeJsonToArr;
    

    var nameProduct = document.getElementById("input-name").value;
    var moneyProduct = document.getElementById("input-money").value;
    var saleProduct = document.getElementById("input-sale").value;
    var linkProduct = document.getElementById("input-link").value;
    var typeProduct = document.getElementById("input-type").value;


    product = Product();
    product.name = nameProduct;
    product.money = moneyProduct;
    product.percentSale  = saleProduct;
    product.img = linkProduct;
    product.type = typeProduct;

    

    if(checkFormEdit()==true){
        if(id==-1){   
            product.id = creatID();
            try {
                listProduct.unshift(product);
            } catch (error) {
                listProduct = new Array();
                listProduct.unshift(product);
            }
        }
        else{
            for (let i = 0; i < listProduct.length; i++) {
                if(listProduct[i].id==id){
                    product.id = id;
                    listProduct[i] = product;
                } 
            }
        }
        var changeArrToJson = JSON.stringify(listProduct);
        localStorage.setItem("listProduct", changeArrToJson);
        hideFrameEdit();
        outIndex();
    }
    
}
function deleteProduct(id){
    var changeJsonToArr = JSON.parse(localStorage.getItem("listProduct"));
    var listProduct = new Array();
    listProduct = changeJsonToArr;

    for (let i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id==id){
            listProduct.splice(i,1);
        } 
    }

    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    hideFrameEdit();
    outIndex();
}

