let xacDinhBird= 3;
let soCotHienTai = 0;
let soCot = 5;
var bird = document.getElementById("birdGame");
var  backgroundGame = document.getElementById("bgGame");
var dataCot = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
runGame();





function runGame(){
    taoCot();
    chayCot();
    hieuChimBay();
    autoRot();
    
}
function vaCham(){
    for (let i = 1; i <= soCot; i++) {
        
        if((dataCot[i].offsetLeft+10< bird.offsetLeft+ bird.offsetWidth) & (dataCot[i].offsetLeft +10> bird.offsetLeft-dataCot[i].offsetWidth)){
            console.log(dataCot[i]);
            if(bird.offsetTop >= backgroundGame.offsetHeight - dataCot[i+soCot].offsetHeight-100){
                alert("game over");
            }
            if(bird.offsetTop <= dataCot[i].offsetHeight){
                alert("game over");
            }
        }
        
    }
}




function chayCot(){
    vaCham();
    for (let i = 1; i <=soCot; i++) {
        dataCot[i].style.left = dataCot[i].offsetLeft - 10 + "px";
        dataCot[i+soCot].style.left = dataCot[i+soCot].offsetLeft - 10 + "px";
        if(dataCot[i].offsetLeft==0){
            backgroundGame.removeChild(dataCot[i]);
            backgroundGame.removeChild(dataCot[i+soCot]);
            dataCot[i]=0;
            dataCot[i+soCot]=0;
            soCotHienTai--;
            taoCot(1);
        }
    }
    setTimeout(chayCot, 400);
}
function taoCot(a){
    if(soCotHienTai<6){
        let saveI=0;
        for (let i = 1; i<= soCot; i++) {
            if(dataCot[i]==0){
                saveI = i;
                break;
            }
        }
        var creatCot  = document.createElement("div");
        var creatCot2 = document.createElement("div");
        creatCot.className = "cot cotTren";
        creatCot.id = "cot"+saveI;
        creatCot.style.height = Math.ceil(Math.random()*200)+50 + "px";
        creatCot2.className = "cot cotDuoi"
        creatCot2.id = "cot"+saveI+"2";
        creatCot2.style.height = Math.ceil(Math.random()*200)+50 + "px";
        backgroundGame.appendChild(creatCot);
        backgroundGame.appendChild(creatCot2);
        soCotHienTai++;
        for (let i = 1; i<=soCot; i++) {
            if(dataCot[i]==0){
                dataCot[i]=creatCot;
                dataCot[i+soCot] =creatCot2;
                break;
            }
        }
        if(a==1){
            dataCot[saveI].style.left = "1100px";
            dataCot[saveI+soCot].style.left = "1100px";
        }
        if(soCotHienTai<soCot){
            taoCot();
        }
    }
}
function dieuKhienChim(){
    if(bird.offsetTop>10){
        console.log()
        var xacDinhViTriBird =  bird.offsetTop-10;
    }
    bird.style.top = xacDinhViTriBird + "px";
}
function autoRot(){
    if(bird.offsetTop< backgroundGame.clientHeight- bird.clientHeight-5){
        var xacDinhViTriBird = 10+ bird.offsetTop;
    }
    bird.style.top = xacDinhViTriBird + "px";
    setTimeout(autoRot,100);
}
function hieuChimBay(){
    xacDinhBird++;
    if(xacDinhBird%4==0){
        bird.style.backgroundImage = 'url("img/c1.png")';
    }
    if(xacDinhBird%4==1){
        bird.style.backgroundImage = 'url("img/c2.png")';
    }
    if(xacDinhBird%4==2){
        bird.style.backgroundImage = 'url("img/c3.png")';
    }
    if(xacDinhBird%4==3){
        bird.style.backgroundImage = 'url("img/c4.png")';
    }
    bird.style.backgroundSize = '100%';
    bird.style.backgroundRepeat = 'no-repeat';
    setTimeout(hieuChimBay,500);
}