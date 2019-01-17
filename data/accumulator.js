const getDigitecData = require('./digitec').getDigitecData;
const getGalaxusData = require('./digitec').getGalaxusData;
const getDayDealData = require('./daydeal').getDayDealData;
const getDayDealDOTWData = require('./daydeal-dotw').getDayDealDOTWData;
const getBlickDealData = require('./blickdeal').getBlickDealData;
const getQoqaData = require('./qoqa').getQoqaData;
const getMicrospotData = require('./microspot').getMicrospotData

const getData = async () => {
  const data = {
      data: [
      await getDigitecData(),
      await getGalaxusData(),
      await getDayDealData(),
      await getDayDealDOTWData(),
      await getBlickDealData(),
      await getMicrospotData(),
      await getQoqaData(),
    ]
  }
  return data
}

module.exports.getData = getData;