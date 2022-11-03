window.addEventListener('load', getQuote)

//Selecting new quote button 
const quoteBtn = document.querySelector('.new-quote');

//Event listener 
quoteBtn.addEventListener('click', getQuote);

//API varible 
const endpoint = 'https://api.kanye.rest/';

//Function to get quote
async function getQuote() { 
    //console.log('test click');
    let text =  await fetch(endpoint);
    let response = await text.text();
   
    let json_response = JSON.parse(response);
    //console.log(json_response);
    console.log(json_response['quote']);

    displayQuote(json_response['quote']);
}

//Function display quote
function displayQuote(x) {
    //const quoteBox = document.querySelector('#js-quote-text');
    //console.log('display test');
   // const textMessage = document.createTextNode(x);

    //quoteBox.appendChild(textMessage);

    document.getElementById('js-quote-text').textContent = x;
}

//getQuote();




  

