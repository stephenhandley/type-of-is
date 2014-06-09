class Barf 
  hi : 'hi'

class Hurl extends Barf
  hi : 'ralph'

class Chuck extends Hurl
  hi : 'UP'

class Derp
  hi : 'no'

module.exports = {
  Barf  : Barf
  Hurl  : Hurl
  Chuck : Chuck
  Derp  : Derp
}

