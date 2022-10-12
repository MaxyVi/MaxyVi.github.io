let div = document.getElementById("imghover")
let img = document.getElementById("image")

document.addEventListener("mouseover", changeIamge);
document.addEventListener("mouseout", mouseout);

function changeIamge() {
    div.style.color = "red";
    img.src = "../js/max-senior2.png"
  }
  
  function mouseout() {
    div.style.color = "black";
    img.src = "../js/max-hood.png";
    document.get
  }