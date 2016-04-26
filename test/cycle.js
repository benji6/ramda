var R = require('..')
var eq = require('./shared/eq')

var runTests = function() {
  it('returns a circular iterable of the supplied function', function() {
    var iterable = R.cycle([1, 2, 3])
    var iterator = iterable[Symbol.iterator]()

    eq(iterator.next(), {done: false, value: 1})
    eq(iterator.next(), {done: false, value: 2})
    eq(iterator.next(), {done: false, value: 3})
    eq(iterator.next(), {done: false, value: 1})
    eq(iterator.next(), {done: false, value: 2})
    eq(iterator.next(), {done: false, value: 3})
    eq(iterator.next(), {done: false, value: 1})
    eq(iterator.next(), {done: false, value: 2})
  })

  it('returns a circular iterable which can generate multiple independent iterators', function() {
    var iterable = R.cycle([1, 2, 3])
    var generator = iterable[Symbol.iterator]
    var iteratorA = generator()
    var iteratorB = generator()

    eq(iteratorA.next(), {done: false, value: 1})
    eq(iteratorA.next(), {done: false, value: 2})
    eq(iteratorA.next(), {done: false, value: 3})
    eq(iteratorA.next(), {done: false, value: 1})
    eq(iteratorB.next(), {done: false, value: 1})
    eq(iteratorB.next(), {done: false, value: 2})
    eq(iteratorA.next(), {done: false, value: 2})
    eq(iteratorB.next(), {done: false, value: 3})
  })

  it('interops with transducers', function() {
    eq(
      R.into([], R.take(8), R.cycle([1, 2, 3])),
      [1, 2, 3, 1, 2, 3, 1, 2]
    )
  })
}

describe('cycle', function() {
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
