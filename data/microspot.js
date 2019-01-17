const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


const getMarkup = async (url) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.setViewport({ width: 1680, height: 862 })
  
  await page.goto(url);
  const markup = await page.evaluate(() => document.documentElement.innerHTML);
  
  await navigationPromise
  await browser.close()
  return markup;
}

const getMicrospotData = async () => {
  let html = await getMarkup('http://microspot.ch/de');
  let $ = cheerio.load(html);

  const href = getHappyDayProductUrl($);
  html = await getMarkup(`http://microspot.ch/de${href}`);
  $ = cheerio.load(html);

  const microspotData = {
    imageUrl: $('.swiper-slide-active img').attr('src'),
    title: $($('[property="name"]').get(0)).text(),
    subTitle: $($('[property="productID"]').get(0)).text(),
    price: $($('[property="price"]').get(0)).text(),
    priceOld: false,
    reduction: false,
    link: `http://microspot.ch/de${href}`,
  }

  return microspotData;
}

const getHappyDayProductUrl = ($) => {
  let returnString = '';
  $('#TOP_OF_PRODUCTS_OVERVIEW div').each((index, item) => {
    if($(item).text && $(item).text().trim() === 'HAPPY DAY') {
      const url = $(item).parent().parent().attr('href');
      if (url !== 'undefined') {
        returnString = url;
      }
    }
  });
  return returnString;
}

module.exports.getMicrospotData = getMicrospotData;