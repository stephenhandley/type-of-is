var strtype = require('.');

console.log(strtype.of('hi there ok')); // "String"
console.log(strtype.of(342));           // "Number"
console.log(strtype.of({}));            // "Object"
console.log(strtype.of([1, 2, 3]));     // "Array" 
console.log(strtype.of(null));          // "Null"
console.log(strtype.of(undefined));     // "Undefined"
console.log(strtype.of(true));          // "Boolean"

console.log(strtype.is(true, Boolean));   // true
console.log(strtype.is(true, "Boolean")); // true
console.log(strtype.is("1231", Number));  // false
console.log(strtype.is([], Object));      // false
console.log(strtype.is({}, Object));      // true