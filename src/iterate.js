var _curry2 = require('./internal/_curry2')
var _symIterator = require('./internal/_symIterator')

/**
 * Returns an infinite iterable of repeating applications of the supplied function firstly to the supplied initial article and thereafter to each previous result
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array | Iterable} list.
 * @return {Iterable} infinite repetition of original list.
 * @example
 *
 *      R.iterate(R.multiply(2), 1) //=> (1, 2, 4, 8, 16, 32, 64...)
 */
module.exports = _curry2(function(f, x) {
  var ret = {}
  ret[_symIterator] = function() {
    var value = x
    return {
      next: function() {
        var nextObj = {done: false, value: value}
        value = f(value)
        return nextObj
      }
    }
  }
  return ret
})
