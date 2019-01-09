const fetch = require('node-fetch');
const cheerio = require('cheerio');


const getHtml = async function() {
  return await fetch('https://www.daydeal.ch/')
    .then(res => res.text())
    .then(body => Promise.resolve(body));
};

const parseData = async function() {
  const html = await getHtml();
  const $ = cheerio.load(html);
  console.log($('.product-description__title1').html());
}

parseData();