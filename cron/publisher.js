var O = require('observed');
var util = require('util');
// var deep = require('deep-diff')
var diff = require('deep-diff').diff;

var stock = require('./stock');
var productTable = stock.productTable;
var inStockTable = stock.inStockTable;

var tweet = require('./twitter');

var ee = O(inStockTable);
ee.on('changed', function(changes) {
  console.log('STOCK CHANGED!!');
  // console.log(util.inspect(changes, false, null));
  // diffTable (changes.oldValue, inStockTable);
});



/*

var testObj = {
  UK : [
    // {
    //   ASIN: "1",
    //   inStock: false
    // },
    // {
    //   ASIN: "2",
    //   inStock: false
    // },
    // {
    //   ASIN: "2",
    //   inStock: false
    // },
    // {
    //   ASIN: "3",
    //   inStock: false
    // },
    // {
    //   ASIN: "4",
    //   inStock: false
    // }
  ]
};

var newObj = {
  UK : [
    {
      ASIN: "1",
      inStock: false
    },
    {
      ASIN: "2",
      inStock: false
    },
    {
      ASIN: "2",
      inStock: true
    },
    {
      ASIN: "3",
      inStock: false
    },
    {
      ASIN: "4",
      inStock: false
    }
  ]
}

var newerObj = {
  UK : [
    {
      ASIN: "1",
      inStock: false
    },
    {
      ASIN: "2",
      inStock: true
    },
    {
      ASIN: "2",
      inStock: true
    },
    {
      ASIN: "3",
      inStock: false
    },
    {
      ASIN: "4",
      inStock: false
    }
  ]
}

var ee = O(testObj);
ee.on('update', function(changes) {
  console.log('STOCK CHANGED!!');
  console.log(changes);
});

setTimeout(function() {
  console.log('Changing object');
  testObj.UK = newObj.UK;
}, 2000);

setTimeout(function() {
  console.log('Changing object');
  testObj.UK = newerObj.UK;
}, 4000);
*/