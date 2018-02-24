import { verify } from '../helpers'
import { anything, arrays } from '../samples'

import { all, values, chain, data, get } from '../../src'

describe('Array construction', () => {
  describe('From constant array: f(*) -> [...]', () => {
    arrays.forEach(xs => {
      const _xs = JSON.stringify(xs)
      it(`f = all(${_xs})`, verify(anything, all(...xs), xs))
      it(`f = values([${_xs}])`, verify(anything, values([...xs]), xs))
      it(`f = chain(all(${_xs}))`, verify(anything, chain(all(...xs)), xs))
      it(`f = chain(values([${_xs}]))`, verify(anything, chain(values([...xs])), xs))
    })
  })
})
