var slider = document.querySelectorAll(".frame-slider");
var timeSliderAuto = 4000;
var countSlider = 0;
createAfterOption();
function createAfterOption(){
    for (let i = 0; i < slider.length-1; i++) {
        document.querySelector(".frame-optionslider").innerHTML += '<div style="width: '+100/slider.length+'%;"></div>'; 
    }
}
function hiddenSlider(){
    for (let i = 0; i < slider.length; i++) {
        slider[i].style.display = "none";
    }
}
changeSlider();
function changeSlider(){
    hiddenSlider();
    slider[countSlider].style.display = "block";

}
function onclickButtonSlider(input){
    countSlider +=input;
    if(countSlider == slider.length) countSlider = 0;
    if(countSlider == -1) countSlider = slider.length -1;
    rangeSlider = document.getElementById("range-slider").value = countSlider*(100/slider.length);
    changeSlider();
}
autoSlider();
function autoSlider(){
    changeSliderWithRange();
    setTimeout(autoSlider, timeSliderAuto*slider.length/100);
}

function changeSliderWithRange(){
    var rangeSlider = document.getElementById("range-slider");
    rangeSlider.value++;
    var ValueRangeSlider = rangeSlider.value*1;
    if(ValueRangeSlider>=100) rangeSlider.value=0;
    countSlider = Math.floor((ValueRangeSlider)/(100/slider.length));
    if(countSlider==slider.length) countSlider -=1;
    changeSlider();
}