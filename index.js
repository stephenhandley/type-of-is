var isBuiltIn = (function () {
  var built_ins = [
    Object,
    Function,
    Array,
    String,
    Boolean,
    Number,
    Date,
    RegExp,
    Error
  ];
  var built_ins_length = built_ins.length;
  
  return function (_constructor) {
    for (var i = 0; i < built_ins_length; i++) {
      if (built_ins[i] === _constructor) {
        return true;
      }
    }
    return false;
  };
})();

var stringType = (function () {
  var _toString = ({}).toString;
  
  return function (obj) {
    // [object Blah] -> Blah
    var stype = _toString.call(obj).slice(8, -1);
    
    if ((obj === null) || (obj === undefined)) {
      return stype.toLowerCase();
    }
    
    var ctype = of(obj);
    
    if (ctype && !isBuiltIn(ctype)) {
      return ctype.name;
    } else {
      return stype;
    }
  };
})();

function of (obj) {
  if ((obj === null) || (obj === undefined)) {
    return obj;
  } else {
    return obj.constructor;
  }
};

function is (obj, test) {
  var typer = (of(test) === String) ? stringType : of;
  return (typer(obj) === test);
};

function instance (obj, test) {
  return (obj instanceof test);
}

module.exports = function (obj, type) {
  if (arguments.length == 1) {
    return of(obj);
  } else {
    return is(obj, type);
  }
}

module.exports.instance = instance;
module.exports.string = stringType;
module.exports.of = of;
module.exports.is = is;