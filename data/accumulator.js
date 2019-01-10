const getDigitecData = require('./digitec').getDigitecData;
const getGalaxusData = require('./digitec').getGalaxusData;
const getDayDealData = require('./daydeal').getDayDealData;

const getData = async () => {
  const data = {
      data: [
      await getDigitecData(),
      await getGalaxusData(),
      await getDayDealData(),
    ]
  }
  return data
}

module.exports.getData = getData;