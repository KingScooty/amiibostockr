var amazonAPI = require('amazon-product-api');

module.exports = {

  create_client: function (credentials) {
    return amazonAPI.createClient(credentials);
  },

  generate_query_arg: function (products, domain) {

    return {
      idType: 'ASIN',
      Condition: 'New',
      includeReviewsSummary: false,
      itemId: products.toString(),
      // itemId: amazon.locale[locale].ASINchunked[chunkIndex].toString(),
      responseGroup: 'ItemAttributes,Offers', //Images
      domain: domain
    }

  },

  query: function () {

  },

  collect_responses: function () {

  }

}