var Path = require('path');
var Assert = require('assert');
var Asserts = require('asserts');

var Type = require(Path.join(__dirname, '..'));

Asserts({
  "Type.of and Type.ofs should properly find types": function () {
    var of_expectations = [
      ["hi", String, "String"],
      [{}, Object, "Object"],
      [[], Array, "Array"],
      [null, null, "Null"],
      [1, Number, "Number"],
      [true, Boolean, "Boolean"],
      [function() {}, Function, "Function"],
      [new Date(), Date, "Date"],
      [new Error(), Error, "Error"],
      [/blah|foo|bar/, RegExp, "RegExp"],
      [undefined, undefined, "Undefined"],
    ];

    of_expectations.forEach(function(expectation) {
      Assert.strictEqual(Type.of(expectation[0]), expectation[1], "testing of(" + expectation[0] + ")");
      Assert.strictEqual(Type.ofs(expectation[0]), expectation[2], "testing ofs(" + expectation[0] + ")");
    });
  },
  
  "Type.is should properly check types": function () {
    var types = [
      String, "String",
      Object, "Object",
      Array, "Array",
      null, "Null",
      Number, "Number", 
      Boolean, "Boolean", 
      Function, "Function",
      Date, "Date",
      Error, "Error",
      RegExp, "RegExp",
      undefined, "Undefined"
    ];

    var is_expectations = [
      [
        ["hi", "there", "1234"],     // values
        [String, "String"],  // expect true
      ],
      [
        [{}, {one: 1, two: 2}], 
        [Object, "Object"]
      ],
      [
        [[], [1,2,3], ["string", 2, false]], 
        [Array, "Array"]
      ],
      [
        [null], 
        [null, "Null"]
      ],
      [
        [1, 20324, 2342.425],
        [Number, "Number"]
      ],
      [ 
        [true, false],
        [Boolean, "Boolean"]
      ],
      [
        [{}.toString, function() { return 1 + 2; }],
        [Function, "Function"]
      ],
      [
        [new Date()],
        [Date, "Date"]
      ],
      [
        [new Error("oh no"), (function () { try { throw new Error("blah"); } catch (e) { return e; }})()],
        [Error, "Error"]
      ],
      [
        [/foo|bar/, /.*abc/],
        [RegExp, "RegExp"]
      ],
      [
        [undefined],
        [undefined, "Undefined"]
      ]
    ];


    // for each group:
    // [0] are arg 1 / objects to test
    // [1] are arg 2 / types to compare against that should return true
    // [2] are arg 2 / types to compare against that should return false
    is_expectations.forEach(function(group) {
      group[0].forEach(function(obj) {
        group[1].forEach(function(true_type) {
          Assert.equal(Type.is(obj, true_type), true,  "testing " + obj + ' is ' + true_type);
        });

        types.forEach(function(false_type) {
          if (group[1].indexOf(false_type) == -1) {
            Assert.strictEqual(Type.is(obj, false_type), false, "testing " + obj + ' is ' + false_type);
          }
        });
      });
    });
  }
});