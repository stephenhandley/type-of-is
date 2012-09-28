# Description

Determine and test types using constructor or Object.toString

# Latest Version

1.0.0

# Installation
```
npm install type-of-is
```

or in package.json 

```json
{
  ...
  "dependencies": {
    "type-of-is": "~1.0.0"
  }
}
```

# Usage
```
var type = require('type-of-is');

type.of(obj)        provides constructor type of an object
type.ofs(obj)       provides type as String from {}.toString
type.is(obj, type)  tests whether obj is of type (constructor or String)
```

```
var type = require('type-of-is');

console.log(type.of('hi there ok'));  // [Function: String]
console.log(type.of(342));            // [Function: Number]
console.log(type.of({}));             // [Function: Object]
console.log(type.of([1, 2, 3]));      // [Function: Array]
console.log(type.of(null));           // null
console.log(type.of(undefined));      // undefined
console.log(type.of(true));           // [Function: Boolean]
console.log(type.of(function () {})); // [Function: Function]
console.log(type.of(/abcd/));         // [Function: RegExp]
console.log(type.of(new Date()));     // [Function: Date]
console.log(type.of(new Error()));    // [Function: Error]

console.log(type.ofs('hi there ok'));  // "String"
console.log(type.ofs(342));            // "Number"
console.log(type.ofs({}));             // "Object"
console.log(type.ofs([1, 2, 3]));      // "Array"
console.log(type.ofs(null));           // "Null"
console.log(type.ofs(undefined));      // "Undefined"
console.log(type.ofs(true));           // "Boolean"
console.log(type.ofs(function () {})); // "Function"
console.log(type.ofs(/abcd/));         // "RegExp"
console.log(type.ofs(new Date()));     // "Date"
console.log(type.ofs(new Error()));    // "Error"

console.log(type.is(true, Boolean));      // true
console.log(type.is("1231", Number));     // false
console.log(type.is("1231", String));     // true
console.log(type.is("1231", "String"));   // true
console.log(type.is("1231", Object));     // false
console.log(type.is([], Object));         // false
console.log(type.is({}, Object));         // true
console.log(type.is([], Array));          // true
console.log(type.is(new Date(), Date));   // true
console.log(type.is(new Date(), Object)); // false

var s = "hihihi";
var Stringy = type.of(s);
var t = new Stringy("hihihi");
console.log((s == t));                    // true
console.log((s === t));                   // false

```


