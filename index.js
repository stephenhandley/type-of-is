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
  
  return function (_constructor) {
    return (built_ins.indexOf(_constructor) != -1);
  };
})();

var stringType = (function () {
  var _toString = ({}).toString;
  
  return function (obj) {
    var construct = constructorType(obj);
    
    if (construct && !isBuiltIn(construct)) {
      return construct.name;
      
    } else {
      var type_string = _toString.call(obj);
      // [object Blah] -> Blah
      return type_string.slice(8, -1);
    }
  };
})();

function constructorType (obj) {
  if ((obj === null) || (obj === undefined)) {
    return obj;
  } else {
    return obj.constructor;
  }
};

function of (obj) {
  var string_type = stringType(obj);
  var root = (typeof window === 'undefined') ? global : window;

  if (root && root.hasOwnProperty(string_type)) {
    return root[string_type];
  } else {
    return constructorType(obj);
  }
}

function is (obj, test) {
  var test_type = of(test);
  var typer = (test_type === String) ? stringType : constructorType;
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
module.exports.construct = constructorType;
module.exports.of = of;
module.exports.is = is;