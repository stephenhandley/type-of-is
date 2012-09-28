function string(obj) {
  return {}.toString.call(obj).slice(1, -1).split(' ').pop();
}

function construct(obj) {
  if ((obj === null) || (obj === undefined)) {
    return obj;
  } else {
    return obj.constructor;
  }
};

function is(obj, type) {
  var typer = (construct(type) === String) ? string : construct
  return (typer(obj) === type);
};

module.exports = function (obj, type) {
  if (arguments.length == 1) {
    return construct(obj);
  } else {
    return is(obj, type);
  }
}

module.exports.string = string;
module.exports.is = is;
module.exports.of = construct;