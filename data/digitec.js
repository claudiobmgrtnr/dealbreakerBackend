const graphQlRequest = require('graphql-request');

const variables = {};

const query = "query GET_LIVESHOPPING_PREVIEWS {\n  liveShoppingPreviews {\n    liveShoppings {\n      liveShoppingId\n      product {\n        ...Product\n        __typename\n      }\n      title\n      portal\n      date\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment Product on Product {\n  id\n  productTypeId\n  productTypeName\n  imageUrl\n  imageSet {\n    alternateText\n    source\n    __typename\n  }\n  sectorId\n  name\n  brandId\n  brandName\n  fullName\n  nameProperties\n  productConditionLabel\n  marketingDescription\n  pricing {\n    supplierId\n    secondHandSalesOfferId\n    price {\n      ...VatMoneySum\n      __typename\n    }\n    priceRebateFraction\n    insteadOfPrice {\n      type\n      price {\n        ...VatMoneySum\n        __typename\n      }\n      __typename\n    }\n    offerType\n    __typename\n  }\n  availability {\n    icon\n    mail {\n      siteId\n      title\n      type\n      icon\n      text\n      description\n      tooltipDescription\n      numberOfItems\n      deliveryDate\n      __typename\n    }\n    pickup {\n      title\n      notAllowedText\n      description\n      isAllowed\n      __typename\n    }\n    pickMup {\n      description\n      isAllowed\n      __typename\n    }\n    sites {\n      siteId\n      title\n      type\n      icon\n      text\n      description\n      tooltipDescription\n      numberOfItems\n      deliveryDate\n      __typename\n    }\n    isFloorDeliveryAllowed\n    __typename\n  }\n  energyEfficiency {\n    energyEfficiencyColorType\n    energyEfficiencyLabelText\n    energyEfficiencyLabelSigns\n    energyEfficiencyImageUrl\n    __typename\n  }\n  salesInformation {\n    numberOfItems\n    numberOfItemsSold\n    isLowAmountRemaining\n    __typename\n  }\n  showroomSites\n  rating\n  totalRatings\n  isIncentiveCashback\n  incentiveText\n  isNew\n  isBestseller\n  isProductSet\n  isSalesPromotion\n  isComparable\n  isDeleted\n  canAddToBasket\n  hidePrice\n  germanNames {\n    germanProductTypeName\n    nameWithoutProperties\n    germanProductNameProperties\n    germanNameWithBrand\n    __typename\n  }\n  productGroups {\n    productGroup1\n    productGroup2\n    productGroup3\n    productGroup4\n    __typename\n  }\n  __typename\n}\n\nfragment VatMoneySum on VatMoneySum {\n  amountIncl\n  amountExcl\n  currency\n  __typename\n}\n";

const getData = async function() {
  data = await graphQlRequest.request('https://www.digitec.ch/api/graphql', query, variables).then(data => Promise.resolve(data));
  return data;
}

const getDigitecData = async function() {
  const data = await getData();
  const digitecData = {
    imageUrl: data.liveShoppingPreviews.liveShoppings[1].product.imageUrl,
    title: data.liveShoppingPreviews.liveShoppings[1].product.name,
    subTitle: data.liveShoppingPreviews.liveShoppings[1].product.brandName,
    price: data.liveShoppingPreviews.liveShoppings[1].product.pricing.price.amountIncl,
    priceOld: data.liveShoppingPreviews.liveShoppings[1].product.pricing.insteadOfPrice.price.amountIncl,
    reduction: data.liveShoppingPreviews.liveShoppings[1].product.pricing.priceRebateFraction,
    link: `https://www.digitec.ch/de/LiveShopping/${data.liveShoppingPreviews.liveShoppings[1].liveShoppingId}`,
  }
  return digitecData;
}

const getGalaxusData = async function() {
  const data = await getData();
  const galaxusData = {
    imageUrl: data.liveShoppingPreviews.liveShoppings[0].product.imageUrl,
    title: data.liveShoppingPreviews.liveShoppings[0].product.name,
    subTitle: data.liveShoppingPreviews.liveShoppings[0].product.brandName,
    price: data.liveShoppingPreviews.liveShoppings[0].product.pricing.price.amountIncl,
    priceOld: data.liveShoppingPreviews.liveShoppings[0].product.pricing.insteadOfPrice.price.amountIncl,
    reduction: data.liveShoppingPreviews.liveShoppings[0].product.pricing.priceRebateFraction,
    link: `https://www.digitec.ch/de/LiveShopping/${data.liveShoppingPreviews.liveShoppings[0].liveShoppingId}`,
  }
  return galaxusData;
}
module.exports.getDigitecData = getDigitecData;
module.exports.getGalaxusData = getGalaxusData;