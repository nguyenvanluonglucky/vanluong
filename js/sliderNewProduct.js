var sliderNewProduct = document.getElementById("slider-new-product");
var nodeChildSliderNewProduct = sliderNewProduct.getElementsByClassName("full-frame-product");
var widthProduct = nodeChildSliderNewProduct[0].offsetWidth;

var count =0;


function RunSlider(){
    sliderNewProduct.style.transform = "translate("+ -count*widthProduct+"px)"
}
function NextAndPrevious(value){
    count+=value;
    if(count > nodeChildSliderNewProduct.length - Math.floor(sliderNewProduct.clientWidth/widthProduct)) count = 0;
    if(count == -1) count =  nodeChildSliderNewProduct.length - Math.floor(sliderNewProduct.clientWidth/widthProduct) ;
    RunSlider();
}
