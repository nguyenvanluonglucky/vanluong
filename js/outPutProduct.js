
var outListProduct = JSON.parse(localStorage.getItem("listProduct"));
function Product(id, name , img , money, percentSale , type){
    var product = new Object();
    product.id = id;
    product.name = name;
    product.img = img;
    product.money = money;
    product.percentSale = percentSale;
    product.type = type;
    product.outPutImg = function(){
        return 'url('+this.img+')';
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


 
function outIndex(){
    creatDataVirtual();
    var listProduct = JSON.parse(localStorage.getItem("listProduct"));
    if(listProduct==null) outListProduct = listProduct;
    filterProduct("all");
    outPutProductNew(outListProduct);
}

function outPutProductNew(listProduct){
    var full = document.getElementById("slider-new-product");
    full.innerHTML = "";
    var End = 7;
    if(End > listProduct.length) End = listProduct.length;
    for (let i = 0; i < End; i++) {
        full.appendChild(CreateNodeOutput(listProduct[i]));
    }
}
function outPutProduct(listProduct){
    var full = document.getElementById("frame-full");
    full.innerHTML = "";
    var End =  12;
    if(End > listProduct.length) End = listProduct.length;
    for (let i = 0; i < End; i++) {
        full.appendChild(CreateNodeOutput(listProduct[i]));
    }
}
function loadMore(){
    var countFrameIFull = document.getElementById("frame-full").getElementsByClassName("full-frame-product");
    var End = countFrameIFull.length + 4;
    if(End > outListProduct.length) End = outListProduct.length;
    for (let i = countFrameIFull.length; i < End; i++) {
        document.getElementById("frame-full").appendChild(CreateNodeOutput(outListProduct[i]));
    }
}
function CreateNodeOutput(inProduct){
    
    var FullframeProduct = document.createElement("div");
    FullframeProduct.className = "full-frame-product";

    var frameProduct = document.createElement("div");
    frameProduct.className = "frame-product";
    FullframeProduct.appendChild(frameProduct);

    var frameImgProduct = document.createElement("div");
    frameImgProduct.className = "frame-img-product";
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

    var nodeAddCart = document.createElement("div");
    nodeAddCart.className = "frame-bt-add-cart";
    frameImgProduct.appendChild(nodeAddCart);

    inProduct = Product(inProduct.id, inProduct.name , inProduct.img , inProduct.money,inProduct.percentSale , inProduct.type);

    frameImgProduct.style.backgroundImage = inProduct.outPutImg();
    frameImgProduct.style.backgroundSize = "100%";
    frameImgProduct.style.backgroundRepeat = "no-repeat"

    nameProduct.append(inProduct.name);
    saleProduct.append(inProduct.outPutSale());
    moneyProduct.append(inProduct.outPutMoney()) ;

    nodeAddCart.innerHTML = '<button class="add-cart" onclick="addToCart('+inProduct.id+',this'+')"><i class="fas fa-cart-plus"></i></button>';    
    return FullframeProduct;
}
function resetFormatForFilter(start,end){
    var NodeFilter = document.querySelectorAll(".future-filter");
    for (let i = start; i < end; i++) {
        NodeFilter[i].style.background = "none";
        NodeFilter[i].style.color = "black";
    }
}

function checkFrom(type){
    let nodeCheck =document.querySelectorAll(".future-filter");
    let i =0;
    if(type =="skirt") i =1;
    if(type =="shirt") i =2;
    if(type =="other") i =3;
    if(type =="0-9") i =4;
    if(type =="9-0") i =5;
    if(type =="az") i =6;
    if(type =="za") i =7;
    nodeCheck[i].style.background = " #f51167";
    nodeCheck[i].style.color = "white";
}
function filterProduct(type){
    resetFormatForFilter(0,4);
    var filterData = new Array();
    var getData = JSON.parse(localStorage.getItem("listProduct"));

    if(type!='all'){
        for (let i = 0; i < getData.length; i++) {
            if(getData[i].type == type){
                filterData.push(getData[i]);
            }
        }
        
    }
    else {
        resetFormatForFilter(0,8);
        filterData = getData;
    }
    checkFrom(type);
    if(filterData.length==0){
        var full = document.getElementById("frame-full");
        full.innerHTML =  "";
        var notification = document.createElement("h1");
        notification.className = "outPutNull";
        notification.innerHTML ="Không có sản phẩm nào";
        full.appendChild(notification);
    }
    else{
        outListProduct = filterData;
        outPutProduct(filterData);
    }
}
function sortProduct(typeSort){
    resetFormatForFilter(4,8);
    checkFrom(typeSort);
    if(typeSort=="0-9"){
        outListProduct.sort(function(a,b){
            return a.money*((100-a.percentSale)/100) - b.money*((100-b.percentSale)/100)
        });
    }
    if(typeSort=="9-0"){
        outListProduct.sort(function(a,b){
            return b.money*((100-b.percentSale)/100) - a.money*((100-a.percentSale)/100)
        });
    }
    if(typeSort=="az"){
        outListProduct.sort(function(a,b){
            var product1 = removeAscent(a.name.toUpperCase());
            var product2 = removeAscent(b.name.toUpperCase());
            if(product1 > product2){
                return 1;
            }
            if(product1 < product2){
                return -1;
            }
            else return 0;
        });
    }
    if(typeSort=="za"){
        outListProduct.sort(function(a,b){
            var product1 = removeAscent(a.name.toUpperCase()) ;
            var product2 = removeAscent(b.name.toUpperCase());
            if(product1 > product2){
                return -1;
            }
            if(product1 < product2){
                return 1;
            }
            else return 0;
        });
    }
    outPutProduct(outListProduct);

}


function addToCart(id, getNode){
    var productCart = new Object();
    var listCart = JSON.parse(localStorage.getItem("listCart"));
    var testListCart= true;
    if(listCart ==null){
        var listCart = new Array();
    }
    for (let i = 0; i < listCart.length; i++) {
        if(listCart[i].id == id){
            animateAddCart(id, getNode);
            listCart[i].sl++;
            testListCart = false;
            break;
        }
    }
    if(testListCart){
        animateAddCart(id, getNode);
        productCart.id = id;
        productCart.sl = 1;
        productCart.check = true;
        listCart.push(productCart);
    }
    
    var changeArrToJson = JSON.stringify(listCart);
    localStorage.setItem("listCart", changeArrToJson);
    showUser();
}

function animateAddCart(id,getNode = document.getElementById("jfdkl")){
    var listProduct = JSON.parse(localStorage.getItem("listProduct"));
    var nodeAnimate = document.createElement("div");
    nodeAnimate.classList.add("animateAddCart");
    let getImgPr = Product();
    for (let i = 0; i < listProduct.length; i++) {
        if(listProduct[i].id == id){
            getImgPr.img = listProduct[i].img;
            nodeAnimate.style.background = getImgPr.outPutImg();
            nodeAnimate.style.backgroundSize = "100%";
            break;
        }
    }
    getNode.parentNode.parentNode.appendChild(nodeAnimate);
    setTimeout(()=>{
        getNode.parentNode.parentNode.removeChild(nodeAnimate);
    },1500);
}





function creatDataVirtual(){
    var listProduct = JSON.parse(localStorage.getItem("listProduct"));

    if(listProduct==null){
        var listProduct = new Array();
        listProduct[0] = Product();
        listProduct[0].name = "Áo Hở Vai Hồng"; 
        listProduct[0].id =creatID();
        listProduct[0].money = 590000;
        listProduct[0].percentSale = 5;
        listProduct[0].type = "shirt";
        listProduct[0].img = './img/home/img-product/0.jpg';

        listProduct[1] = Product();
        listProduct[1].name = "ÁO Khoác Da Đen"; 
        listProduct[1].id =creatID();
        listProduct[1].money = 410000;
        listProduct[1].percentSale = 5;
        listProduct[1].type = "shirt";
        listProduct[1].img = './img/home/img-product/1.jpg';

        listProduct[2] = Product();
        listProduct[2].name ="Áo Sơ Mi Trắng"; 
        listProduct[2].id =creatID();
        listProduct[2].money = 580000;
        listProduct[2].percentSale = 12;
        listProduct[2].type = "shirt";
        listProduct[2].img = './img/home/img-product/2.jpg';

        listProduct[3] = Product();
        listProduct[3].name = "Combo Chân Váy Kiểu + Áo thun Trắng"; 
        listProduct[3].id =creatID();
        listProduct[3].money = 300000;
        listProduct[3].percentSale = 24;
        listProduct[3].type = "skirt";
        listProduct[3].img = './img/home/img-product/3.jpg';

        listProduct[4] = Product();
        listProduct[4].name = "Chân Váy xám"; 
        listProduct[4].id =creatID();
        listProduct[4].money = 410000;
        listProduct[4].percentSale = 40;
        listProduct[4].type = "shirt";
        listProduct[4].img = './img/home/img-product/4.jpg';

        listProduct[5] = Product();
        listProduct[5].name = "Combo Chân Váy Jean + Áo Phông Sọc"; 
        listProduct[5].id =creatID();
        listProduct[5].money = 360000;
        listProduct[5].percentSale = 23;
        listProduct[5].type = "skirt";
        listProduct[5].img = './img/home/img-product/5.jpg';

        listProduct[6] = Product();
        listProduct[6].name = "Chân Váy Caro Xanh"; 
        listProduct[6].id =creatID();
        listProduct[6].money = 490000;
        listProduct[6].percentSale = 12;
        listProduct[6].type = "skirt";
        listProduct[6].img = './img/home/img-product/6.jpg';

        listProduct[7] = Product();
        listProduct[7].name = "Quần KaKi Xám Nhạt"; 
        listProduct[7].id =creatID();
        listProduct[7].money = 390000;
        listProduct[7].percentSale = 34;
        listProduct[7].type = "other";
        listProduct[7].img = './img/home/img-product/7.jpg';

        listProduct[8] = Product();
        listProduct[8].name = "Áo Vải Trơn Lụa"; 
        listProduct[8].id =creatID();
        listProduct[8].money = 90000;
        listProduct[8].percentSale = 12;
        listProduct[8].type = "shirt";
        listProduct[8].img = './img/home/img-product/8.jpg';

        listProduct[9] = Product();
        listProduct[9].name = "Váy Hồng Ôm Ngực"; 
        listProduct[9].id =creatID();
        listProduct[9].money = 859000;
        listProduct[9].percentSale = 20;
        listProduct[9].type = "skirt";
        listProduct[9].img = './img/home/img-product/9.jpg';

        listProduct[10] = Product();
        listProduct[10].name = "Váy Đỏ Bó Ngực"; 
        listProduct[10].id =creatID();
        listProduct[10].money = 290000;
        listProduct[10].percentSale = 1;
        listProduct[10].type = "skirt";
        listProduct[10].img = './img/home/img-product/10.jpg';

        listProduct[11] = Product();
        listProduct[11].name = "Áo Khoác Hồng Có Mũ Trùm"; 
        listProduct[11].id =creatID();
        listProduct[11].money = 640000;
        listProduct[11].percentSale = 0;
        listProduct[11].type = "shirt";
        listProduct[11].img = './img/home/img-product/11.jpg';

        listProduct[12] = Product();
        listProduct[12].name = "Váy Đen Bó Sát"; 
        listProduct[12].id =creatID();
        listProduct[12].money = 480000;
        listProduct[12].percentSale = 7;
        listProduct[12].type = "skirt";
        listProduct[12].img = './img/home/img-product/12.jpg';

        listProduct[13] = Product();
        listProduct[13].name = "Áo Phông Tay Lửng"; 
        listProduct[13].id =creatID();
        listProduct[13].money = 123000;
        listProduct[13].percentSale = 2;
        listProduct[13].type = "shirt";
        listProduct[13].img = './img/home/img-product/13.jpg';

        listProduct[14] = Product();
        listProduct[14].name = "Combo Chân Váy Ngắn Áo Ngắn Caro"; 
        listProduct[14].id =creatID();
        listProduct[14].money = 210000;
        listProduct[14].percentSale = 5;
        listProduct[14].type = "skirt";
        listProduct[14].img = './img/home/img-product/14.jpg';

        listProduct[15] = Product();
        listProduct[15].name = "Áo Phông Tay Lửng"; 
        listProduct[15].id =creatID();
        listProduct[15].money = 65000;
        listProduct[15].percentSale = 1;
        listProduct[15].type = "shirt";
        listProduct[15].img = './img/home/img-product/15.jpg';

        listProduct[16] = Product();
        listProduct[16].name = "Combo Chân Váy Ngắn Áo Ngắn Vàng"; 
        listProduct[16].id =creatID();
        listProduct[16].money = 840000;
        listProduct[16].percentSale = 2;
        listProduct[16].type = "skirt";
        listProduct[16].img = './img/home/img-product/16.jpg';

        listProduct[17] = Product();
        listProduct[17].name = "Áo Phông Tay Dài Hàn Quốc"; 
        listProduct[17].id =creatID();
        listProduct[17].money = 100000;
        listProduct[17].percentSale = 3;
        listProduct[17].type = "shirt";
        listProduct[17].img = './img/home/img-product/17.jpg';

        listProduct[18] = Product();
        listProduct[18].name = "Áo Sơ Mi Đỏ Chấm Bi Nhỏ"; 
        listProduct[18].id =creatID();
        listProduct[18].money = 490000;
        listProduct[18].percentSale = 8;
        listProduct[18].type = "shirt";
        listProduct[18].img = './img/home/img-product/18.jpg';

        listProduct[19] = Product();
        listProduct[19].name = "Áo Khoác Vải Mỏng"; 
        listProduct[19].id =creatID();
        listProduct[19].money = 950000;
        listProduct[19].percentSale = 7;
        listProduct[19].type = "shirt";
        listProduct[19].img = './img/home/img-product/19.jpg';

        listProduct[20] = Product();
        listProduct[20].name = "Áo Khoác Vãi Dù Xanh"; 
        listProduct[20].id =creatID();
        listProduct[20].money = 190000;
        listProduct[20].percentSale = 6;
        listProduct[20].type = "shirt";
        listProduct[20].img = './img/home/img-product/20.jpg';

        listProduct[21] = Product();
        listProduct[21].name = "Áo Thun Bó Tay Dài"; 
        listProduct[21].id =creatID();
        listProduct[21].money = 680000;
        listProduct[21].percentSale = 2;
        listProduct[21].type = "shirt";
        listProduct[21].img = './img/home/img-product/21.jpg';

        listProduct[22] = Product();
        listProduct[22].name = "Áo Phông Sọc Ngang"; 
        listProduct[22].id =creatID();
        listProduct[22].money = 140000;
        listProduct[22].percentSale = 9;
        listProduct[22].type = "shirt";
        listProduct[22].img = './img/home/img-product/22.jpg';

        listProduct[23] = Product();
        listProduct[23].name = "Áo Phông Tay Dài"; 
        listProduct[23].id =creatID();
        listProduct[23].money = 120000;
        listProduct[23].percentSale = 4;
        listProduct[23].type = "shirt";
        listProduct[23].img = './img/home/img-product/23.jpg';

        listProduct[24] = Product();
        listProduct[24].name = "Áo Sơ Mi Sọc Caro"; 
        listProduct[24].id =creatID();
        listProduct[24].money = 340000;
        listProduct[24].percentSale = 2;
        listProduct[24].type = "shirt";
        listProduct[24].img = './img/home/img-product/24.jpg';

        var changeListProductToJson = JSON.stringify(listProduct);
        localStorage.setItem("listProduct",changeListProductToJson);
    }
    
}
