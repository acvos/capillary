import { verify } from '../helpers'
import { anything, arrays, objects } from '../samples'

import { all, values, chain, data, get } from '../../src'

describe('Array construction', () => {
  describe('From constant array: f(*) -> [...]', () => {
    arrays.forEach(xs => {
      it(`f = all(${xs.join(', ')})`, verify(anything, all(...xs), xs))
      it(`f = values([${xs.join(', ')}])`, verify(anything, values([...xs]), xs))
      it(`f = chain(all(${xs.join(', ')}))`, verify(anything, chain(all(...xs)), xs))
      it(`f = chain(values([${xs.join(', ')}]))`, verify(anything, chain(values([...xs])), xs))
    })
  })

  describe('From constant object: f(*) -> [...]', () => {
    objects.forEach(xs => {
      it(`f = keys({${xs.join(', ')}})`, verify(anything, keys(xs), Object.keys(xs)))
    })
  })

  describe('Transparent to incoming arrays: f([...]) -> [...]', () => {
    arrays.forEach(xs => {
      const $xs = xs.join(', ')
      it(`[${$xs}] -> chain() -> [${$xs}]`, verify(xs, chain(), xs))
      it(`[${$xs}] -> get('') -> [${$xs}]`, verify(xs, get(''), xs))
      it(`[${$xs}] -> data -> [${$xs}]`, verify(xs, data, xs))
      it(`[${$xs}] -> chain(get('')) -> [${$xs}]`, verify(xs, chain(get('')), xs))
      it(`[${$xs}] -> chain(get(''), data) -> [${$xs}]`, verify(xs, chain(get(''), data), xs))
    })
  })

    // it('f = values({ a: 1, b: 2, c: 3 })', verify(anything, values({ a: 1, b: 2, c: 3 }), [1, 2, 3]))
    // it('f = values({ a: 1, b: 2, c: 3 })', verify(anything, values({ a: 1, b: 2, c: 3 }), [1, 2, 3]))
  // it('[1, 2, 3] -> values -> [1, 2, 3]', check(values()([1, 2, 3]), [1, 2, 3]))
  // it('{ a: 1, b: 2 } -> values -> [1, 2]', check(values()({ a: 1, b: 2 }), [1, 2]))
})
