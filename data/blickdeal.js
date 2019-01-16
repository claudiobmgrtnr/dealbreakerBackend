const fetch = require('node-fetch');
const cheerio = require('cheerio');


const getHtml = async function() {
  return await fetch('https://www.blickdeal.ch/')
    .then(res => res.text())
    .then(body => Promise.resolve(body));
};

const getBlickDealData = async function() {
  const html = await getHtml();
  const $ = cheerio.load(html);
  const data = {
    imageUrl: $('.product-img-main-pic').attr('src'),
    title: $('.product-description__title1').html(),
    subTitle: $('.product-description__title2').text(),
    price: extractPrice($('.product-pricing__prices-new-price')),
    priceOld: extractPrice($('.product-pricing__prices-old-price')),
    reduction: `-${$('.js-pricetag').text()}%`,
    link: 'https://www.blickdeal.ch'
  }
  return data;
}

const extractPrice = ($priceDiv) => {
  // remove the children to avoid superscript 2 getting in the price
  $priceDiv.children().remove();
  // get all numbers of the price
  const cleanNumbers = $priceDiv.text().match(/(\d+)/g);
  // add - to second match if there is no number to have a consistent output
  cleanNumbers[1] ? null : cleanNumbers[1] = '–'
  return `${cleanNumbers[0]}.${cleanNumbers[1]}`;
}

module.exports.getBlickDealData = getBlickDealData;