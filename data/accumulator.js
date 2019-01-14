const getDigitecData = require('./digitec').getDigitecData;
const getGalaxusData = require('./digitec').getGalaxusData;
const getDayDealData = require('./daydeal').getDayDealData;
const getDayDealDOTWData = require('./daydeal-dotw').getDayDealDOTWData;

const getData = async () => {
  const data = {
      data: [
      await getDigitecData(),
      await getGalaxusData(),
      await getDayDealData(),
      await getDayDealDOTWData(),
    ]
  }
  return data
}

module.exports.getData = getData;