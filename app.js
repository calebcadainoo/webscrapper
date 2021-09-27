const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');

const app = express();
const urlToScrape = 'https://www.theguardian.com/international';

const articles = [];
axios(urlToScrape)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('.fc-item__title', html).each(function () {
      const title = $(this).text();
      const url = $(this).find('a').attr('href');

      articles.push({
        title,
        url,
      });
    });

    // console.log(articles);
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.json(articles);
});

app.listen(PORT, console.log(`https://localhost:${PORT} is running...`));
