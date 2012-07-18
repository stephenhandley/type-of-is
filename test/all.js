var path = require('path');
var assert = require('assert');

var strtype = require(path.join(__dirname, '..'));

try {
  var of_expectations = [
    ["hi", "String"],
    [{}, "Object"],
    [[], "Array"],
    [null, "Null"],
    [1, "Number"],
    [true, "Boolean"],
    [function() {}, "Function"],
    [undefined, "Undefined"]
  ];
  
  of_expectations.forEach(function(expectation) {
    assert.equal(strtype.of(expectation[0]), expectation[1]);
  });
  
  var is_expectations = [
    [
      ["hi", "there", "1234"],     // values
      [String, "String"],  // expect true
      ["Object", "Array", "Null", "Number", "Boolean", "Function", "Undefined"], // expect false
    ],
    [
      [{}, {one: 1, two: 2}], 
      [Object, "Object"],
      ["String", "Array", "Null", "Number", "Boolean", "Function", "Undefined"]
    ],
    [
      [[], [1,2,3]], 
      [Array, "Array"], 
      ["String", "Object", "Null", "Number", "Boolean", "Function", "Undefined"]
    ],
    [
      [null], 
      [null, "Null"],
      ["String", "Object", "Array", "Number", "Boolean", "Function", "Undefined"]
    ],
    [
      [1, 20324, 2342.425],
      [Number, "Number"],
      ["String", "Object", "Array", "Null", "Boolean", "Function", "Undefined"]
    ],
    [ 
      [true, false],
      [Boolean, "Boolean"],
      ["String", "Object", "Array", "Null", "Number", "Function", "Undefined"]
    ],
    [
      [{}.toString, function() { return 1 + 2; }],
      [Function, "Function"],
      ["String", "Object", "Array", "Null", "Number", "Boolean", "Undefined"]
    ],
    [
      [undefined],
      [undefined, "Undefined"],
      ["String", "Object", "Array", "Null", "Number", "Boolean", "Function"]
    ]
  ];
  
  
  // for each group:
  // [0] are arg 1 / objects to test
  // [1] are arg 2 / types to compare against that should return true
  // [2] are arg 2 / types to compare against that should return false
  is_expectations.forEach(function(group) {
    group[0].forEach(function(obj) {
      group[1].forEach(function(true_type) {
        assert.equal(strtype.is(obj, true_type), true);
      });
      group[2].forEach(function(false_type) {
        assert.equal(strtype.is(obj, false_type), false);
      });
    });
  });

  console.log("All tests passed.");
  
} catch (error) {
  console.log(error);
  console.log("Test Failed.");
  console.log("   Expected: " + error.expected);
  console.log("     Actual: " + error.actual); 
}