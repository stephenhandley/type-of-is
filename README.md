# Description

Determine and test types using constructor or Object.toString

# Latest Version

2.0.0

# Installation
```
npm install type-of-is
```

or in package.json 

```json
{
  ...
  "dependencies": {
    "type-of-is": "2.0.0"
  }
}
```

# Usage
```
var Type = require('type-of-is');

Type(obj)           provides constructor type of an object
Type.string(obj)    provides type as String from {}.toString
Type.is(obj, type)  tests whether obj is of type (constructor or String)
```

```
var Type = require('type-of-is');

console.log(Type('hi there ok'));  // [Function: String]
console.log(Type(342));            // [Function: Number]
console.log(Type(342));            // [Function: Number]
console.log(Type({}));             // [Function: Object]
console.log(Type([1, 2, 3]));      // [Function: Array]
console.log(Type(null));           // null
console.log(Type(undefined));      // undefined
console.log(Type(true));           // [Function: Boolean]
console.log(Type(function () {})); // [Function: Function]
console.log(Type(/abcd/));         // [Function: RegExp]
console.log(Type(new Date()));     // [Function: Date]
console.log(Type(new Error()));    // [Function: Error]

console.log(Type.string('hi there ok'));  // "String"
console.log(Type.string(342));            // "Number"
console.log(Type.string({}));             // "Object"
console.log(Type.string([1, 2, 3]));      // "Array"
console.log(Type.string(null));           // "Null"
console.log(Type.string(undefined));      // "Undefined"
console.log(Type.string(true));           // "Boolean"
console.log(Type.string(function () {})); // "Function"
console.log(Type.string(/abcd/));         // "RegExp"
console.log(Type.string(new Date()));     // "Date"
console.log(Type.string(new Error()));    // "Error"

console.log(Type.is(true, Boolean));      // true
console.log(Type.is("1231", Number));     // false
console.log(Type.is("1231", String));     // true
console.log(Type.is("1231", "String"));   // true
console.log(Type.is("1231", Object));     // false
console.log(Type.is([], Object));         // false
console.log(Type.is({}, Object));         // true
console.log(Type.is([], Array));          // true
console.log(Type.is(new Date(), Date));   // true
console.log(Type.is(new Date(), Object)); // false

var s = "hihihi";
var Stringy = Type(s);
var t = new Stringy("hihihi");
console.log((s == t));                    // true
console.log((s === t));                   // false

```

#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/type-of-is.png)](http://travis-ci.org/stephenhandley/type-of-is)
