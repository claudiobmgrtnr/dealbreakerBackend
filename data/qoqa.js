const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let markup = "";
const getMarkup = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.setViewport({ width: 1680, height: 862 })
  
  await page.goto('https://www.qoqa.ch/de')
  markup = await page.evaluate(() => document.documentElement.innerHTML);
  
  await navigationPromise
  await browser.close()
  return markup;
}

const getQoqaData = async () => {
  const html = await getMarkup();
  const $ = cheerio.load(html);
  const qoqaData = {
    imageUrl: $('.offer__img').css('background-image').replace(/url\(\"/g, '').replace(/\"\)/g, ''),
    title: $('.offer__sellable.title2').text(),
    subTitle: $('.offer__catchline').text(),
    price: $('.offer-unit-price-test').text(),
    priceOld: `--`,
    reduction: '--',
    link: `https://www.qoqa.ch/de`,
  }
  
  return qoqaData;
}

module.exports.getQoqaData = getQoqaData;