const puppeteer = require('puppeteer');
const cheerio = require('cheerio');


const getMarkup = async (browser, url, close) => {
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.setViewport({ width: 1680, height: 1200 });
  
  await page.goto(url);
  const markup = await page.evaluate(() => Promise.resolve(document.documentElement.innerHTML));
  
  await navigationPromise
  if (close) {
    await browser.close()
  }
  return markup;
}

const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: true });
  return browser;
}

const getMicrospotData = async () => {
  const browser = await startBrowser();
  let html = await getMarkup(browser, 'http://microspot.ch/de', false);
  let $ = cheerio.load(html);

  const href = getHappyDayProductUrl($);
  
  html = await getMarkup(browser, `http://microspot.ch/de${href}`, true);
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