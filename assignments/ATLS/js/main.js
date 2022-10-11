let div = document.getElementById("imghover")
let img = document.getElementById("image")

document.addEventListener("mouseover", changeIamge);
document.addEventListener("mouseout", mouseout);

function changeIamge() {
    console.log("yay");
    div.style.color = "red";
    img.src = "max-hood.png";
  }
  
  function mouseout() {
    div.style.color = "black";
    img.src = "max-senior2.png";
  }