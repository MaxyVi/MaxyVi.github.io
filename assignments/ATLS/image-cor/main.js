const displayedImage = document.querySelector('.displayed-img1');
const thumbBar = document.querySelector('.thumb-bar1');

const btn = document.querySelector('button1');
const overlay = document.querySelector('.overlay1');

/* Declaring the array of image filenames */
const images = ['pic1.jpg', `pic2.jpg`, `pic3.jpg`, `pic4.jpg`, `pic5.jpg`];
const alts = {
  'pic1.jpg' : 'Serious Max with hat',
  'pic2.jpg' : 'Foggy bridge',
  'pic3.jpg' : 'Cool dad',
  'pic4.jpg' : 'Sunny lock',
  'pic5.jpg' : 'Boat'
}
/* Looping through images */

for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
      displayedImage.src = e.target.src;
      displayedImage.alt = e.target.alt;
    });
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

  

