const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = "images/pic1.jpg";

imgArray[1] = new Image();
imgArray[1].src = "images/pic2.jpg";

imgArray[2] = new Image();
imgArray[2].src = "images/pic3.jpg";

imgArray[3] = new Image();
imgArray[3].src = "images/pic4.jpg";

imgArray[4] = new Image();
imgArray[4].src = "images/pic5.jpg";

/* Declaring the alternative text for each image file */

imgArray[0] = new Image();
imgArray[0].alt = "pic1";

imgArray[1] = new Image();
imgArray[1].alt = "pic2";

imgArray[2] = new Image();
imgArray[2].alt = "pic3";

imgArray[3] = new Image();
imgArray[3].alt = "pic4";

imgArray[4] = new Image();
imgArray[4].alt = "pic5";

/* Looping through images */

function thumbLoop() {
    var i;
    for (i = 0; i < imgArray.length; i++) {
    var newImage = document.createElement('img');
    newImage.setAttribute('src', "images/pic" + (i+1) + ".jpg");
    thumbBar.appendChild(newImage);
  }
  }

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', (c) => {
    if (c.target.className == 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  }
  
   else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
  });

thumbLoop();

/* Making the clicked thumbnail the large image */

thumbBar.addEventListener('click', (c) => {
  if(c.target && c.target.nodeName == "IMG") {
    displayedImage.src = c.target.src;
    displayedImage.alt = c.target.alt;
}
});

  

