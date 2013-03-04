# Description

Sensible JavaScript type detection and comparison. 


### Built in objects / primitives 

| obj                       | Type.of(obj)  | Type.is(...) === true         |
| ------------------------- |:-------------:| ----------------------------- |
| ```{ x : 2 }```           | Object        | ```Type.is(obj, Object)```    |
| ```function () {}```      | Function      | ```Type.is(obj, Function)```  |
| ```[1, 2, 3]```           | Array         | ```Type.is(obj, Array)```     |
| ```"barf"```              | String        | ```Type.is(obj, String)```    |
| ```true```                | Boolean       | ```Type.is(obj, Boolean)```   |
| ```10```                  | Number        | ```Type.is(obj, Number)```    |
| ```new Date()```          | Date          | ```Type.is(obj, Date)```      |
| ```/abc/```               | RegExp        | ```Type.is(obj, RegExp)```    |
| ```new Error("barf!")```  | Error         | ```Type.is(obj, Error)```     |


### Objects created via new

```javascript
function Person (name) {
  this.name = name;
}
Person.prototype.barf = function () {
  return this.name + " just barfed!";
}

var ralph = new Person('Ralph');

Type.of(ralph);                  // [Function: Person]
Type.is(ralph, Person);          // true
Type.is(ralph, Object);          // false
Type.instance(ralph, Person));   // true
Type.instance(ralph, Object));   // true
```

Type determination uses a combination using ({}).toString and constructor


# Latest Version

3.0.0


# Installation
```
npm install type-of-is
```

or in package.json 

```json
{
  ...
  "dependencies": {
    "type-of-is": "3.0.0"
  }
}
```


# Usage
```javascript
var Type = require('type-of-is');

Type.of(obj)              // returns constructor type of an object
Type.string(obj)          // provides type as String ({}).toString
Type.is(obj, type)        // tests whether obj is of type (constructor or String)
Type.instance(obj, type)  // convenience wrapping instanceof

// The top level Type export delegates to Type.of and Type.is based on argument count

Type(obj) === Type.of(obj)
Type(obj, type) === Type.is(obj, type)

```


# More examples
```javascript
var Type = require('type-of-is');

// Type.of(arg) and Type(one_argument) return constructor of type determined from ({}).toString
console.log(Type.of('hi there ok'));  // [Function: String]
console.log(Type.of(342));            // [Function: Number]
console.log(Type.of({}));             // [Function: Object]
console.log(Type.of([1, 2, 3]));      // [Function: Array]
console.log(Type.of(null));           // null
console.log(Type.of(undefined));      // undefined
console.log(Type(true));              // [Function: Boolean]
console.log(Type(function () {}));    // [Function: Function]
console.log(Type(/abcd/));            // [Function: RegExp]
console.log(Type(new Date()));        // [Function: Date]
console.log(Type(new Error()));       // [Function: Error]

// Type.string(arg) returns the string name of constructor
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

// Type.is(object, type) and Type(object, type) returns true if object is of type 
// as determined by Type.of 
console.log(Type.is(true, Boolean));      // true
console.log(Type.is("1231", Number));     // false
console.log(Type.is("1231", String));     // true
console.log(Type.is("1231", "String"));   // true
console.log(Type.is("1231", Object));     // false
console.log(Type([], Object));            // false
console.log(Type({}, Object));            // true
console.log(Type([], Array));             // true
console.log(Type(new Date(), Date));      // true
console.log(Type(new Date(), Object));    // false

var s = "hihihi";
var Stringy = Type.of(s);
var t = new Stringy("hihihi");
console.log((s == t));                    // true
console.log((s === t));                   // false

// User defined objects should be instances of Objects but also can get actual constructor type
function Person (name) {
  this.name = name;
}
Person.prototype.barf = function () {
  return this.name + " just barfed!";
}
var ralph = new Person('Ralph');
console.log(Type.of(ralph));                 // [Function: Person]
console.log(Type.is(ralph, Person));         // true
console.log(Type.instance(ralph, Person));   // true
console.log(Type.instance(ralph, Object));   // true

```


# Rationale
typeof is unreliable for many reason (Array as object, null as object etc.), and constructor checking is unreliable in multi-frame dom environments. 

Avoid type comparison using strings whose string case / formatting differs from constructor / type names

Return constructor as type so it can be used to create new objects i.e.
```javascript
var s = "s";
var t = new Type.of(s)("t");
```

Relevant reading / inspiration
http://ecma262-5.com/ELS5_HTML.htm
http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
http://skilldrick.co.uk/2011/09/understanding-typeof-instanceof-and-constructor-in-javascript/
http://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/
http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/


#Build status
[![build status](https://secure.travis-ci.org/stephenhandley/type-of-is.png)](http://travis-ci.org/stephenhandley/type-of-is)
