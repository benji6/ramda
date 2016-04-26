var R = require('..')
var eq = require('./shared/eq')

var runTests = function() {
  it('returns an infinite iterable derived from consecutive applications of supplied function to initial argument', function() {
    var iterable = R.iterate(function(x) { return 2 * x }, 1)
    var iterator = iterable[Symbol.iterator]()

    eq(iterator.next(), {done: false, value: 1})
    eq(iterator.next(), {done: false, value: 2})
    eq(iterator.next(), {done: false, value: 4})
    eq(iterator.next(), {done: false, value: 8})
    eq(iterator.next(), {done: false, value: 16})
    eq(iterator.next(), {done: false, value: 32})
    eq(iterator.next(), {done: false, value: 64})
    eq(iterator.next(), {done: false, value: 128})
  })

  it('returns a circular iterable which can generate multiple independent iterators', function() {
    var iterable = R.iterate(function(x) { return 3 * x }, 2)
    var generator = iterable[Symbol.iterator]
    var iteratorA = generator()
    var iteratorB = generator()

    eq(iteratorA.next(), {done: false, value: 2})
    eq(iteratorA.next(), {done: false, value: 6})
    eq(iteratorA.next(), {done: false, value: 18})
    eq(iteratorA.next(), {done: false, value: 54})
    eq(iteratorB.next(), {done: false, value: 2})
    eq(iteratorB.next(), {done: false, value: 6})
    eq(iteratorA.next(), {done: false, value: 162})
    eq(iteratorB.next(), {done: false, value: 18})
  })

  it('interops with transducers', function() {
    eq(
      R.into([], R.take(8), R.iterate(function(x) { return x + 5 }, 3)),
      [3, 8, 13, 18, 23, 28, 33, 38]
    )
  })
}

describe('iterate', function() {
  describe('when Symbol is defined (assumes tests are actually being run in an environment where Symbol is defined)', function() {
    runTests()
  })

  describe('when Symbol is undefined', function() {
    var sym = typeof Symbol === 'undefined' ? undefined : Symbol
    delete Symbol
    runTests()
    if (sym !== undefined) { Symbol = sym }
  })
})
