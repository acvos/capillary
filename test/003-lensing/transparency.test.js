import { verify } from '../helpers'
import { anything } from '../samples'

import { chain, data, get } from '../../src'

describe('Transparent lenses', () => {
  describe('Single fragments', () => {
    anything.forEach(xs => {
      const _xs = JSON.stringify(xs)
      it(`${_xs} -> chain() -> ${_xs}`, verify(xs, chain(), xs))
      it(`${_xs} -> get('') -> ${_xs}`, verify(xs, get(''), xs))
      it(`${_xs} -> data -> ${_xs}`, verify(xs, data, xs))
      it(`${_xs} -> data.get -> ${_xs}`, verify(xs, data, xs))
    })
  })

  describe('Function call style', () => {
    anything.forEach(xs => {
      const _xs = JSON.stringify(xs)
      it(`${_xs} -> get('', get('')) -> ${_xs}`, verify(xs, chain(get(''), data), xs))
      it(`${_xs} -> get('', chain()) -> ${_xs}`, verify(xs, chain(get(''), data), xs))
      it(`${_xs} -> get('', data.get('')) -> ${_xs}`, verify(xs, chain(get(''), data), xs))
      it(`${_xs} -> get('', get('', data)) -> ${_xs}`, verify(xs, chain(get(''), data), xs))
    })
  })

  describe('Chains', () => {
    anything.forEach(xs => {
      const _xs = JSON.stringify(xs)
      it(`${_xs} -> chain(get('')) -> ${_xs}`, verify(xs, chain(get('')), xs))
      it(`${_xs} -> chain(get(''), data) -> ${_xs}`, verify(xs, chain(get(''), data), xs))
      it(`${_xs} -> chain(chain, get(''), chain(data, get('')), data, chain) -> ${_xs}`, verify(xs, chain(get(''), data), xs))
    })
  })
})
