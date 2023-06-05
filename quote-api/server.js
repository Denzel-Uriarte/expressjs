const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
  const element = getRandomElement(quotes)
  res.send({ quote: element})
})

app.get('/api/quotes', (req, res, next) => {
  const author = req.query.person;
  console.log(author);
  let quotesArray;

  if (author) { 
    quotesArray = quotes.filter((element) => {
      return element.person === author;
    });
  } else {
    quotesArray = quotes;
  }

  res.send({ quotes: quotesArray });
});

app.post('/api/quotes', (req, res, next) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (quote && person) {
    const quoteObject = { quote: quote, person: person }
    quotes.push(quoteObject)
    res.send({ quote: quoteObject})
  } else {
    res.status(404).send();
  }
})

app.put()