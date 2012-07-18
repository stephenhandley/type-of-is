type = (obj)->
  {}.toString.call(obj).slice(1, -1).split(' ').pop()
  
isType = (obj, obj_type)->
  unless (type(obj_type) is 'String')
    obj_type = obj_type.name.toString()
  type(obj) is obj_type