var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

var storyText = 'It was 94 fahrenheit outside, so :insertx: went out for a night in town. When they got to :inserty:, they laughed in unison for a few moments, then :insertz:. Bob giggled the whole time, but still was not amused — :insertx: weighs 300 pounds, and it was a brisk night.';

var insertX = ['Moses himself','Big Daddy','Kanye West'];

var insertY = ['your moms house','Spain','the aether'];

var insertZ = ['summoned satan','turned into a frog and waited for prince','enlisted in the army'];

randomize.addEventListener('click', result);

randomize.addEventListener('click', result);

function result() {

  var newStory = storyText;

  var xItem = randomValueFromArray(insertX);
  var yItem = randomValueFromArray(insertY);
  var zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(':insertx:',xItem);
  newStory = newStory.replace(':insertx:',xItem);
  newStory = newStory.replace(':inserty:',yItem);
  newStory = newStory.replace(':insertz:',zItem);

  if(customName.value !== '') {
    var name = customName.value;
    newStory = newStory.replace('Bob',name);

  }

  if(document.getElementById("uk").checked) {
    var weight = Math.round(21) + ' stone';
    var temperature =  Math.round(34) + ' centigrade';
    newStory = newStory.replace('300 pounds',weight);
    newStory = newStory.replace('94 fahrenheit',temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}


