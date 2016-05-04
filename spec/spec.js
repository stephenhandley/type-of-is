describe('type-of-is', function(){
    var Type = require('../index');

    it('Type.of(arg) and Type(one_argument) return constructor of type', function(){
        expect(Type.of('hi there ok')).toBe(String);
        expect(Type.of(342)).toBe(Number);
        expect(Type.of({})).toBe(Object);
        expect(Type.of([1, 2, 3])).toBe(Array);
        expect(Type.of(null)).toBe(null);
        expect(Type.of(undefined)).toBe(undefined);
        expect(Type(true)).toBe(Boolean);
        expect(Type(function () {})).toBe(Function);
        expect(Type(/abcd/)).toBe(RegExp);
        expect(Type(new Date())).toBe(Date);
        expect(Type(new Error())).toBe(Error);
    });

    it('Type.string(arg) returns the string name of constructor', function(){
        expect(Type.string('hi there ok')).toBe("String");
        expect(Type.string(342)).toBe("Number");
        expect(Type.string({})).toBe("Object");
        expect(Type.string([1, 2, 3])).toBe("Array");
        expect(Type.string(null)).toBe("Null");
        expect(Type.string(undefined)).toBe("Undefined");
        expect(Type.string(true)).toBe("Boolean");
        expect(Type.string(function () {})).toBe("Function");
        expect(Type.string(/abcd/)).toBe("RegExp")
        expect(Type.string(new Date())).toBe("Date");
        expect(Type.string(new Error())).toBe("Error");
    });

    it('Type.is(object, type) and Type(object, type) tests object type', function(){
        expect(Type.is(true, Boolean)).toBe(true);
        expect(Type.is("1231", Number)).toBe(false);
        expect(Type.is("1231", String)).toBe(true);
        expect(Type.is("1231", "String")).toBe(true);
        expect(Type.is("1231", Object)).toBe(false);
        expect(Type([], Object)).toBe(false);
        expect(Type({}, Object)).toBe(true);
        expect(Type([], Array)).toBe(true);
        expect(Type(new Date(), Date)).toBe(true);
        expect(Type(new Date(), Object)).toBe(false);
    });

    it('factory made by Type.of()', function(){
        var s = "hihihi";
        var Stringy = Type.of(s);
        var t = new Stringy("hihihi");
        expect(s == t).toBe(true);
        expect(s === t).toBe(false);
    });

    it('User defined objects should be instances of Objects but also can get actual constructor type', function(){

        function Person (name) {
            this.name = name;
        }
        Person.prototype.barf = function () {
            return this.name + " just barfed!";
        };

        var ralph = new Person('Ralph');

        expect(Type.of(ralph)).toBe(Person);
        expect(Type.is(ralph, Person)).toBe(true);
        expect(Type.is(ralph, Object)).toBe(false);
        expect(Type.instance(ralph, Person)).toBe(true);
        expect(Type.instance(ralph, Object)).toBe(true);
    });

    it('arguments is weird edge case, there\'s no Arguments global but typeof arguments is "arguments". type returned is Object, but not sure what would be preferable', function(){
        (function () {
            expect(Type.of(arguments)).toBe(Object);
        })();
    });

    it('other built-ins', function(){
        expect(Type.of(Infinity)).toBe(Number);
        expect(Type.of(-Infinity)).toBe(Number);
        expect(Type.of(NaN)).toBe(Number);
        expect(Type.of(Math)).toBe(Object);
        expect(Type.of(JSON)).toBe(Object);
    });

    it('Returning constructor as type allows it to be used to create new objects', function(){
        var s = "s";
        var t = new Type.of(s)("t");
        expect(t.toUpperCase()).toBe('T');    
    });

    it('Type.any(obj, [Array, Of, Types]) and Type(obj, [Array, Of, Types]) should test whether the object is any of the passed in types', function(){
        var str = 'hihihi';
        expect(Type.any(str, [String, Number, Array])).toBe(true);
        expect(Type(str, [Array, RegExp])).toBe(false);    
    });
});
