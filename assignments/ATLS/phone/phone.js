//declare 3 variables for sections of phone #
//create clickcounter
var areaCode = 0;
var middle = 0;
var last = 0;

var clicks = 0;

function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var added = event.clientX + event.clientY;
    var coor = added;
    document.getElementById("demo").innerHTML = coor;
  }
  
  function clearCoor() {
    document.getElementById("demo").innerHTML = "";
  }

  function clickCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var added = event.clientX + event.clientY;
    var areaCode = added;
    var middle = added;
    var last = added;
    clicks += 1;
    if (clicks == 1){
        area.textContent = "(" + areaCode +")-";
    }
    if (clicks == 2){
        mid.textContent = middle + "-";
    }
    if (clicks == 3){
        fin.textContent = last;
    }
  }
  function finalNum(event){
        
}