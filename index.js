function ofs(obj) {
  return {}.toString.call(obj).slice(1, -1).split(' ').pop();
}

function of(obj) {
  if ((obj === null) || (obj === undefined)) {
    return obj;
  } else {
    return obj.constructor;
  }
};

function is(obj, type) {
  var typer = (of(type) === String) ? ofs : of
  return (typer(obj) === type);
};

module.exports = {
  of: of,
  ofs: ofs,
  is: is
};