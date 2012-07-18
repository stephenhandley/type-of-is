function type(obj) {
  return {}.toString.call(obj).slice(1, -1).split(' ').pop();
};

function isType(obj, obj_type) {
  if ((obj_type === null) || (obj_type === undefined)) {
    obj_type = type(obj_type);
  } else if (!(type(obj_type) === 'String')) {
    obj_type = obj_type.name.toString();
  }
  
  return (type(obj) === obj_type);
};

module.exports = {
  of: type,
  is: isType
};
