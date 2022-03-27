const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quote = []

// Show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loader
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
    randomQuote = quote[Math.floor(Math.random() * quote.length)];
    if (!randomQuote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = randomQuote.author;    
    }
    // Check quote length to set font-size
    if (randomQuote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote and hide loader
    quoteText.textContent = randomQuote.text;
    complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
       const response = await fetch(apiUrl); 
       quote = await response.json(); 
       newQuote();
    } catch (error) {
        //if API fails, use local quotes instead
        quote = localQuotes
        newQuote();
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

getQuotes();

