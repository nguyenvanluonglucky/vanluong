var dataOX = new Array();
var nguoiChoi =0;
var doiTuongWin =0;
var luatChanHaiDau = true;
for (let i = 0; i <=11; i++) {
    dataOX[i] = new Array(2);  
}
var findID = new Array();
for (let i = 0; i <=10; i++) {
    findID[i] = new Array(2);  
}

ganButtonVaoMang();
// tạo mảng lưu trữ documentgetid
function resetGame(){
    for (let i = 0; i <= 10; i++) {
        for (let j = 0; j <= 10; j++) {
            dataOX[i][j] = 0;
        }
    }
    xuatOXlenManHinh();
    nguoiChoi=0;
    doiTuongWin=0;
    document.getElementById("thongBao").style.display = "none";
    document.getElementById("khungGame").style.zIndex = "1";
}
function startGame(a=0,b=0){
    
    if(dataOX[a][b]==0){
        nguoiChoi++;
        dataOX[a][b]= layNguoiChoi(nguoiChoi);
    }
    xuatOXlenManHinh();
    kiemTraWin();
}
//kiểm tra win
function kiemTraWin(){
    if(kiemTraWinRow()==true||kiemTraWinCol()==true||kiemTraDuongCheo1()==true||kiemTraDuongCheo2()==true){
        document.getElementById("thongBao").style.display = "block";
        document.getElementById("khungGame").style.zIndex = "-1";
        if(doiTuongWin==1){
            document.getElementById("ketQua").innerHTML = "Người chơi  O thắng";
        }
        if(doiTuongWin==2){
            document.getElementById("ketQua").innerHTML = "Người chơi  X thắng";
        }
        
    }
}
//kiểm tra hàng
function kiemTraWinRow(){
    
    for (let i = 1; i <=10; i++) {
        var cout =1;
        var dataViTri =0;
        for (let j = 1; j <=10; j++) {
            if(dataViTri != dataOX[i][j]){
                dataViTri = dataOX[i][j];
                doiTuongWin = dataViTri;
                cout=0;
            }
            if((dataViTri == dataOX[i][j])&(dataViTri !=0)){
                cout++;
            }
            if(cout>5){
                return true;
            }
            
            if(cout==5){
                if(luatChanHaiDau==true){
                    if(dataOX[i][j+1]==0||dataOX[i][j+1]==dataViTri||dataOX[i][j-5]==0||dataOX[i][j-5]==dataViTri){
                        return true;
                    }
                }
                else{
                    return true;
                }
                
            }
        }
    }
}
function kiemTraWinCol(){
    for (let i = 1; i <=10; i++) {
        var cout =1;
        var dataViTri =0;
        for (let j = 1; j <=10; j++) {
            if(dataViTri != dataOX[j][i]){
                dataViTri = dataOX[j][i];
                doiTuongWin = dataViTri;
                cout=0;
            }
            if((dataViTri == dataOX[j][i])&(dataViTri !=0)){
                cout++;
            }
            if(cout>=5){
                if(cout==5){
                    if(luatChanHaiDau==true){
                        if((dataOX[j+1][i]==0)||(dataOX[j+1][i]==dataViTri)||(dataOX[j-5][i]==0)||(dataOX[j-5][i]==dataViTri)){
                            return true;
                        }
                    }
                    else return true;
                }
                else return true;
                
            }
            
        }
    }
    
}
function kiemTraDuongCheo1(){
    var saveI;
    for (let i = 1; i <=10; i++) {
        var cout =1;
        var dataViTri =0;
        saveI = i;
        for (let j = 1; j <=i; j++) {
            // findID[j][saveI].innerHTML
            if(dataViTri != dataOX[j][saveI]){
                dataViTri = dataOX[j][saveI];
                doiTuongWin = dataViTri;
                cout=0;
            }
            if((dataViTri == dataOX[j][saveI])&(dataViTri !=0)){
                cout++;
            }
            if(cout>=5){
                if(cout==5){
                    if(luatChanHaiDau==true){
                        if((dataOX[j+1][saveI-1]==0)||(dataOX[j+1][saveI-1]==dataViTri)||(dataOX[j-5][saveI+5]==0)||(dataOX[j-5][saveI+5]==dataViTri)){
                            return true;
                        }
                    }
                    else return true;
                }
                else return true;
                
            }

            saveI--;
        }
    }
    for (let i = 10; i >=1; i--) {
        saveI = i;
        for (let j = 10; j >=i; j--) {
            // findID[j][saveI].innerHTML = "O";
            if(dataViTri != dataOX[j][saveI]){
                dataViTri = dataOX[j][saveI];
                doiTuongWin = dataViTri;
                cout=0;
            }
            if((dataViTri == dataOX[j][saveI])&(dataViTri !=0)){
                cout++;
            }
            if(cout>=5){
                if(cout==5){
                    if(luatChanHaiDau==true){
                        if((dataOX[j-1][saveI+1]==0)||(dataOX[j-1][saveI+1]==dataViTri)||(dataOX[j+5][saveI-5]==0)||(dataOX[j+5][saveI-5]==dataViTri)){
                            return true;
                        }
                    }
                    else return true;
                }
                else return true;
                
            }


            saveI++;
        }
    }
}
function kiemTraDuongCheo2(){
    var saveI =0;
    for (let i = 1; i <=10; i++) {
        var cout =1;
        var dataViTri =0;
        saveI = i;
        for (let j = 1; saveI <=10; j++) {
            // findID[j][saveI].innerHTML
            if(dataViTri != dataOX[j][saveI]){
                dataViTri = dataOX[j][saveI];
                doiTuongWin = dataViTri;
                cout=0;
            }
            if((dataViTri == dataOX[j][saveI])&(dataViTri !=0)){
                cout++;
            }
            if(cout>=5){
                if(cout==5){
                    if(luatChanHaiDau==true){
                        if((dataOX[j+1][saveI+1]==0)||(dataOX[j+1][saveI+1]==dataViTri)||(dataOX[j-5][saveI-5]==0)||(dataOX[j-5][saveI-5]==dataViTri)){
                            return true;
                        }
                    }
                    else return true;
                }
                else return true;
                
            }
            saveI++;
        }
    }
    for (let i = 10; i >=1; i--) {
        var cout =1;
        var dataViTri =0;
        saveI = i;
        for (let j = 10; saveI >=1; j--) {
            // findID[j][saveI].innerHTML
            if(dataViTri != dataOX[j][saveI]){
                dataViTri = dataOX[j][saveI];
                doiTuongWin = dataViTri;
                cout=0;
            }
            if((dataViTri == dataOX[j][saveI])&(dataViTri !=0)){
                cout++;
            }
            if(cout>=5){
                if(cout==5){
                    if(luatChanHaiDau==true){
                        if((dataOX[j-1][saveI-1]==0)||(dataOX[j-1][saveI-1]==dataViTri)||(dataOX[j+5][saveI+5]==0)||(dataOX[j+5][saveI+5]==dataViTri)){
                            console.log("Save:"+saveI);
                            console.log("j : "+ j);
                            return true;
                        }
                    }
                    else return true;
                }
                else return true;
            }
            saveI--;
        }
    }
}
//lấy thứ tự người chơi
function layNguoiChoi(nguoiChoi){
    if(nguoiChoi%2==0){
        return 1;
    }
    if(nguoiChoi %2==1){
        return 2;
    }
}
//xuất ox lên màn hình với giá trị tương ứng
function xuatOXlenManHinh(){
    for (let i = 1; i <=10; i++) {
        for (let j = 1; j <=10; j++) {
            if(dataOX[i][j]==1){
                findID[i][j].innerHTML = "O";
            }
            if(dataOX[i][j]==2){
                findID[i][j].innerHTML = "X";
                findID[i][j].style.color = "red";
            } 
            if(dataOX[i][j]==0){
                findID[i][j].innerHTML = "";
            }
        }
    }
}
function ganButtonVaoMang(){
    
    findID[1][1] = document.getElementById("1");
    findID[1][2] = document.getElementById("2");
    findID[1][3] = document.getElementById("3");
    findID[1][4] = document.getElementById("4");
    findID[1][5] = document.getElementById("5");
    findID[1][6] = document.getElementById("6");
    findID[1][7] = document.getElementById("7");
    findID[1][8] = document.getElementById("8");
    findID[1][9] = document.getElementById("9");
    findID[1][10] = document.getElementById("10");
    //1
    findID[2][1] = document.getElementById("11");
    findID[2][2] = document.getElementById("12");
    findID[2][3] = document.getElementById("13");
    findID[2][4] = document.getElementById("14");
    findID[2][5] = document.getElementById("15");
    findID[2][6] = document.getElementById("16");
    findID[2][7] = document.getElementById("17");
    findID[2][8] = document.getElementById("18");
    findID[2][9] = document.getElementById("19");
    findID[2][10] = document.getElementById("20");
    // 2
    findID[3][1] = document.getElementById("21");
    findID[3][2] = document.getElementById("22");
    findID[3][3] = document.getElementById("23");
    findID[3][4] = document.getElementById("24");
    findID[3][5] = document.getElementById("25");
    findID[3][6] = document.getElementById("26");
    findID[3][7] = document.getElementById("27");
    findID[3][8] = document.getElementById("28");
    findID[3][9] = document.getElementById("29");
    findID[3][10] = document.getElementById("30");
    //3
    findID[4][1] = document.getElementById("31");
    findID[4][2] = document.getElementById("32");
    findID[4][3] = document.getElementById("33");
    findID[4][4] = document.getElementById("34");
    findID[4][5] = document.getElementById("35");
    findID[4][6] = document.getElementById("36");
    findID[4][7] = document.getElementById("37");
    findID[4][8] = document.getElementById("38");
    findID[4][9] = document.getElementById("39");
    findID[4][10] = document.getElementById("40");
    //4
    findID[5][1] = document.getElementById("41");
    findID[5][2] = document.getElementById("42");
    findID[5][3] = document.getElementById("43");
    findID[5][4] = document.getElementById("44");
    findID[5][5] = document.getElementById("45");
    findID[5][6] = document.getElementById("46");
    findID[5][7] = document.getElementById("47");
    findID[5][8] = document.getElementById("48");
    findID[5][9] = document.getElementById("49");
    findID[5][10] = document.getElementById("50");
    //5
    findID[6][1] = document.getElementById("51");
    findID[6][2] = document.getElementById("52");
    findID[6][3] = document.getElementById("53");
    findID[6][4] = document.getElementById("54");
    findID[6][5] = document.getElementById("55");
    findID[6][6] = document.getElementById("56");
    findID[6][7] = document.getElementById("57");
    findID[6][8] = document.getElementById("58");
    findID[6][9] = document.getElementById("59");
    findID[6][10] = document.getElementById("60");
    //6
    findID[7][1] = document.getElementById("61");
    findID[7][2] = document.getElementById("62");
    findID[7][3] = document.getElementById("63");
    findID[7][4] = document.getElementById("64");
    findID[7][5] = document.getElementById("65");
    findID[7][6] = document.getElementById("66");
    findID[7][7] = document.getElementById("67");
    findID[7][8] = document.getElementById("68");
    findID[7][9] = document.getElementById("69");
    findID[7][10] = document.getElementById("70");
    //7
    findID[8][1] = document.getElementById("71");
    findID[8][2] = document.getElementById("72");
    findID[8][3] = document.getElementById("73");
    findID[8][4] = document.getElementById("74");
    findID[8][5] = document.getElementById("75");
    findID[8][6] = document.getElementById("76");
    findID[8][7] = document.getElementById("77");
    findID[8][8] = document.getElementById("78");
    findID[8][9] = document.getElementById("79");
    findID[8][10] = document.getElementById("80");
    //8
    findID[9][1] = document.getElementById("81");
    findID[9][2] = document.getElementById("82");
    findID[9][3] = document.getElementById("83");
    findID[9][4] = document.getElementById("84");
    findID[9][5] = document.getElementById("85");
    findID[9][6] = document.getElementById("86");
    findID[9][7] = document.getElementById("87");
    findID[9][8] = document.getElementById("88");
    findID[9][9] = document.getElementById("89");
    findID[9][10] = document.getElementById("90");
    //9
    findID[10][1] = document.getElementById("91");
    findID[10][2] = document.getElementById("92");
    findID[10][3] = document.getElementById("93");
    findID[10][4] = document.getElementById("94");
    findID[10][5] = document.getElementById("95");
    findID[10][6] = document.getElementById("96");
    findID[10][7] = document.getElementById("97");
    findID[10][8] = document.getElementById("98");
    findID[10][9] = document.getElementById("99");
    findID[10][10] = document.getElementById("100");
}