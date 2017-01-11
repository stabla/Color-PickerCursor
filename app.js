/*  Check my website : https://www.stabla.me/
    Check my GitHub : @stabla
    Me : Guillaume Bonnet
*/
const wrapperEl = document.getElementById('wrapper'),
    scrollerEl = document.getElementById('scroller');

var X, // Red, it's x axis
    Y, // Green, it's y axis
    depth, // Blue, it's scroll
    xValue = 0,
    yValue = 0,
    depthValue = 0;

var colorInputValue = document.getElementsByClassName('color')[0];
var colorHexaInputValue = document.getElementsByClassName('color-hexa')[0];


function componentToHex(c) { // only for input
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) { // only for input
    return (componentToHex(r) + componentToHex(g) + componentToHex(b));
}

const change = function () {
    wrapperEl.style.backgroundColor = 'rgb(' + xValue + ',' + yValue + ',' + depthValue + ')';

    colorInputValue.value = xValue + ',' + yValue + ',' + depthValue; // only for input
    colorHexaInputValue.value = rgbToHex(xValue, yValue, depthValue); // only for input
    

var colorItEl = document.getElementsByClassName('colorIt');
for (var i = 0; i < colorItEl.length; ++i) {
  colorItEl[i].style.color = 'rgb(' + xValue + ',' + yValue + ',' + depthValue + ')';
}
    
    
}

wrapperEl.onmousemove = function (e) {
    X = e.pageX - wrapperEl.offsetLeft;
    Y = e.pageY - wrapperEl.offsetTop;

    // Ratio is the size (= the width/height taken) of each colors on the wrapper. Because R or G or B (Red, Green, Blue) have 0 to 255 values possibles, the ratio of width, and height, have to be divided by 255. 
    var widthRatio = wrapperEl.offsetWidth / 255;
    var heightRatio = wrapperEl.offsetHeight / 255;

    // Round value, because we want not X.XXXX but only X. X is between {0;255} and is a natural number. 
    xValue = Math.round(X / widthRatio);
    yValue = Math.round(Y / heightRatio);

    change()
};

wrapperEl.addEventListener("scroll", function () {
    var depth = wrapperEl.scrollY || wrapperEl.scollTop || wrapperEl.scrollTop;

    var depthRatio = (scrollerEl.offsetHeight - wrapperEl.offsetHeight) / 255;
    depthValue = Math.round(depth / depthRatio);

    change();
});

// Option, not needed to wrapper. It's to check input when value is modified.
colorInputValue.addEventListener('input', function (e) {
    wrapperEl.style.backgroundColor = 'rgb(' + this.value + ')';
    colorHexaInputValue.value = rgbToHex(xValue, yValue, depthValue);
});

colorHexaInputValue.addEventListener('input', function (e) {
    wrapperEl.style.backgroundColor = '#' + this.value;
    colorInputValue.value = xValue + ',' + yValue + ',' + depthValue;
});
