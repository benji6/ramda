var _curry1 = require('./internal/_curry1')
var _symIterator = require('./internal/_symIterator')

/**
 * Returns an infinite circular repetition of the provided list if the original list/iterable is finite or the identity of infinite iterables
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
 *      R.cycle([1, 2, 3]) //=> (1, 2, 3, 1, 2, 3...)
 *      R.into([], R.take(8), R.cycle([1, 2, 3])) //=> [1, 2, 3, 1, 2, 3, 1, 2]
 */
module.exports = _curry1(function(iterable) {
  var len = iterable.length
  var ret = {}
  ret[_symIterator] = function() {
    var i = -1
    return {
      next: function() {
        i += 1
        return {done: false, value: iterable[i % len]}
      }
    }
  }
  return ret
})
